import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ClientName } from "../../enums/client-name.enum";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ObjectIdScalar } from "../../scallers/object-id.scalar";
import { InventoryService } from "./inventory.service";
import { InventoryResolver } from "./inventory.resolver";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: ClientName.INVENTORY,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("RMQ_URL")],
            queue: configService.get<string>("RMQ_INVENTORY_QUEUE")
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  providers: [
    ObjectIdScalar,
    InventoryService,
    InventoryResolver
  ]
})
export class InventoryModule {
}