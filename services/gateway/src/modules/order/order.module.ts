import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { ObjectIdScalar } from "../../scallers/object-id.scalar";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: ClientName.ORDER,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("RMQ_URL")],
            queue: configService.get<string>("RMQ_ORDER_QUEUE")
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  providers: [
    ObjectIdScalar,
    OrderService,
    OrderResolver
  ]
})
export class OrderModule {
}