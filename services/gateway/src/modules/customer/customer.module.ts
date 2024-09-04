import {Module} from "@nestjs/common";
import {ObjectIdScalar} from "../../scallers/object-id.scalar";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ClientName} from "../../enums/client-name.enum";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CustomerService} from "./customer.service";
import {CustomerResolver} from "./customer.resolver";
import {getRabbitmqUrl} from "../../helpers/rabbitmq-url-getter.helper";

@Module({
    imports: [
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: ClientName.CUSTOMER,
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
                            queue: configService.get<string>("RMQ_CUSTOMER_QUEUE")
                        }
                    }
                },
                inject: [ConfigService]
            }
        ])
    ],
    providers: [
        ObjectIdScalar,
        CustomerService,
        CustomerResolver
    ]
})
export class CustomerModule {
}