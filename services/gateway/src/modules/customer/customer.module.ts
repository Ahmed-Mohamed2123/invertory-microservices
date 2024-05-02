import { Module } from "@nestjs/common";
import { ObjectIdScalar } from "../../scallers/object-id.scalar";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ClientName } from "../../enums/client-name.enum";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CustomerService } from "./customer.service";
import { CustomerResolver } from "./customer.resolver";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: ClientName.CUSTOMER,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("RMQ_URL")],
            queue: configService.get<string>("RMQ_CUSTOMER_QUEUE")
          }
        }),
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