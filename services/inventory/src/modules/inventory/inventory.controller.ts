import { Controller, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { InventoryService } from "./inventory.service";
import { CreateInventoryDto } from "./dtos/create-inventory.dto";
import { EditInventoryDto } from "./dtos/edit-inventory.dto";
import { GetInventoryItemDto } from "./dtos/get-inventory-item.dto";
import { CreateInventoryItemDto } from "./dtos/create-inventory-item.dto";
import { EditInventoryItemDto } from "./dtos/edit-inventory-item.dto";
import { GetInventoryDto } from "./dtos/get-inventory.dto";

@Controller("inventory")
export class InventoryController {
  constructor(private inventoryService: InventoryService) {
  }

  @MessagePattern("get-inventories")
  getInventories(@Payload(ValidationPipe) getInventoryDto: GetInventoryDto,
                 @Ctx() context: RmqContext) {
    return this.inventoryService.getInventories(getInventoryDto, context);
  }

  @MessagePattern("get-inventories-count")
  getInventoriesCount(@Ctx() context: RmqContext) {
    return this.inventoryService.getInventoriesCount(context);
  }

  @MessagePattern("create-inventory")
  createInventory(@Payload(ValidationPipe) createInventoryDto: CreateInventoryDto,
                  @Ctx() context: RmqContext) {
    return this.inventoryService.createInventory(createInventoryDto, context);
  }

  @MessagePattern("edit-inventory")
  editInventory(@Payload() editInventoryDto: EditInventoryDto,
                @Ctx() context: RmqContext) {
    return this.inventoryService.editInventory(editInventoryDto, context);
  }

  @MessagePattern("delete-inventory")
  deleteInventory(@Payload(ValidationPipe) inventoryId: string,
                  @Ctx() context: RmqContext) {
    return this.inventoryService.deleteInventory(inventoryId, context);
  }

  @MessagePattern("get-inventory-items")
  getInventoryItems(@Payload(ValidationPipe) getInventoryItemDto: GetInventoryItemDto,
                    @Ctx() context: RmqContext) {
    return this.inventoryService.getInventoryItems(getInventoryItemDto, context);
  }

  @MessagePattern("get-inventory-items-count")
  getInventoryItemsCount(@Payload(ValidationPipe) inventoryId: string,
                         @Ctx() context: RmqContext) {
    return this.inventoryService.getInventoryItemsCount(inventoryId, context);
  }

  @MessagePattern("create-inventory-item")
  createInventoryItem(@Payload(ValidationPipe) createInventoryItemDto: CreateInventoryItemDto,
                      @Ctx() context: RmqContext) {
    return this.inventoryService.createInventoryItem(createInventoryItemDto, context);
  }

  @MessagePattern("edit-inventory-item")
  editInventoryItem(@Payload(ValidationPipe) editInventoryItemDto: EditInventoryItemDto,
                    @Ctx() context: RmqContext) {
    return this.inventoryService.editInventoryItem(editInventoryItemDto, context);
  }

  @MessagePattern("delete-inventory-item")
  deleteInventoryItem(@Payload(ValidationPipe) inventoryItemId: string,
                      @Ctx() context: RmqContext) {
    return this.inventoryService.deleteInventoryItem(inventoryItemId, context);
  }
}