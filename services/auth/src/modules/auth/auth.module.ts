import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {ClientName} from "../../enums/client-name.enum";

@Module({
    imports: [
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: ClientName.ADMIN_USER,
                imports: [ConfigModule],
                useFactory: async (configService: ConfigService) => {
                    const RMQ_USER = configService.get<string>("RMQ_USER");
                    const RMQ_PASS = configService.get<string>("RMQ_PASS");
                    const RMQ_HOST = configService.get<string>("RMQ_HOST");
                    const RMQ_PORT = configService.get<string>("RMQ_PORT");

                    const RMQ_URL = `amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}`;

                    return {
                        transport: Transport.RMQ,
                        options:
                            {
                                urls: [RMQ_URL],
                                queue:
                                    configService.get<string>("RMQ_ADMIN_USER_QUEUE")
                            }
                    }
                },
                inject: [ConfigService]
            }
        ]),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get("JWT_SECRET_KEY"),
                    signOptions: {
                        expiresIn: configService.get("JWT_EXPIRES_IN")
                    }
                };
            },
            inject: [ConfigService],
            imports: [ConfigModule]
        })
    ],
    providers: [
        AuthService
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule {
}