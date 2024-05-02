import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ClientName } from "../../enums/client-name.enum";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ShipmentService } from "./shipment.service";
import { ShipmentResolver } from "./shipment.resolver";
import { ObjectIdScalar } from "../../scallers/object-id.scalar";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: ClientName.SHIPMENT,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("RMQ_URL")],
            queue: configService.get<string>("RMQ_SHIPMENT_QUEUE")
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  providers: [
    ObjectIdScalar,
    ShipmentService,
    ShipmentResolver
  ]
})
export class ShipmentModule {
}