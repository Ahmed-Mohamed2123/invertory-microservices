import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Shipment, ShipmentSchema } from "./schemas/shipment.schema";
import { ShipmentRepository } from "./repositories/shipment.repository";
import { ShipmentService } from "./shipment.service";
import { ShipmentController } from "./shipment.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Shipment.name,
        schema: ShipmentSchema
      }
    ])
  ],
  providers: [
    ShipmentService,
    ShipmentRepository
  ],
  controllers: [
    ShipmentController
  ]
})
export class ShipmentModule {
}