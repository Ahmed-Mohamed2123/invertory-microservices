import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Inventory, InventorySchema } from "./schemas/inventory.schema";
import { InventoryItemSchema, InventoryItem } from "./schemas/inventory-item.schema";
import { InventoryRepository } from "./repositories/inventory.repository";
import { InventoryItemRepository } from "./repositories/inventory-item.repository";
import { InventoryController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inventory.name,
        schema: InventorySchema
      },
      {
        name: InventoryItem.name,
        schema: InventoryItemSchema
      }
    ])
  ],
  providers: [
    InventoryService,
    InventoryRepository,
    InventoryItemRepository
  ],
  controllers: [
    InventoryController
  ]
})
export class InventoryModule {
}