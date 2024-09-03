import {Module} from "@nestjs/common";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ClientName} from "../../enums/client-name.enum";
import {UserService} from "./user.service";
import {UserResolver} from "./user.resolver";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ObjectIdScalar} from "../../scallers/object-id.scalar";
import {getRabbitmqUrl} from "../../helpers/rabbitmq-url-getter.helper";

@Module({
    imports: [
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: ClientName.ADMIN_USER,
                imports: [ConfigModule],
                useFactory: async (configService: ConfigService) => {
                    const RMQ_PORT = configService.get<string>("RMQ_PORT");
                    const RMQ_PASS = configService.get<string>("RMQ_PASS");
                    const RMQ_USER = configService.get<string>("RMQ_USER");
                    const rmqUrl = getRabbitmqUrl(RMQ_USER, RMQ_PASS, RMQ_PORT);

                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [rmqUrl],
                            queue: configService.get<string>('RMQ_ADMIN_USER_QUEUE'),
                        },
                    }
                },
                inject: [ConfigService],
            },
        ]),
    ],
    providers: [
        UserService,
        UserResolver,
        ObjectIdScalar
    ]
})
export class UserModule {
}