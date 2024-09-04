import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./stratigies/jwt.strategy";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ClientName} from "../../enums/client-name.enum";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthService} from "./auth.service";
import {AuthResolver} from "./auth.resolver";
import {getRabbitmqUrl} from "../../helpers/rabbitmq-url-getter.helper";

@Module({
    imports: [
        ConfigModule,
        PassportModule.register({
            defaultStrategy: "jwt"
        }),
        ClientsModule.registerAsync([
            {
                name: ClientName.AUTHENTICATION,
                imports: [ConfigModule],
                useFactory: async (configService: ConfigService) => {
                    const RMQ_PORT = configService.get<string>("RMQ_PORT");
                    const RMQ_PASS = configService.get<string>("RMQ_PASS");
                    const RMQ_USER = configService.get<string>("RMQ_USER");
                    const RMQ_HOST = configService.get<string>("RMQ_HOST");
                    const rmqUrl = getRabbitmqUrl(RMQ_HOST, RMQ_USER, RMQ_PASS, RMQ_PORT);

                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [rmqUrl],
                            queue: configService.get<string>("RMQ_AUTHENTICATION_QUEUE")
                        }
                    }
                },
                inject: [ConfigService]
            },
            {
                name: ClientName.ADMIN_USER,
                imports: [ConfigModule],
                useFactory: async (configService: ConfigService) => {
                    const RMQ_PORT = configService.get<string>("RMQ_PORT");
                    const RMQ_PASS = configService.get<string>("RMQ_PASS");
                    const RMQ_USER = configService.get<string>("RMQ_USER");
                    const RMQ_HOST = configService.get<string>("RMQ_HOST");
                    const rmqUrl = getRabbitmqUrl(RMQ_HOST, RMQ_USER, RMQ_PASS, RMQ_PORT);

                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [rmqUrl],
                            queue: configService.get<string>("RMQ_ADMIN_USER_QUEUE")
                        }
                    }
                },
                inject: [ConfigService]
            }
        ])
    ],
    providers: [
        JwtStrategy,
        AuthService,
        AuthResolver
    ],
    exports: [
        PassportModule
    ]
})
export class AuthModule {
}