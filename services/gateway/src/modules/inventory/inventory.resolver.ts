import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards, UsePipes } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { UserAuthGuard } from "../../guards/user-auth.guard";
import { Inventory } from "./models/inventory";
import { CreateInventoryInput } from "./dtos/inputs/create-inventory.input";
import { EditInventoryInput } from "./dtos/inputs/edit-inventory.input";
import { GetInventoryArgs } from "./dtos/args/get-inventory.args";
import { ObjectIdValidatorPipe } from "../../pipes/object-id-validator.pipe";
import { InventoryItem } from "./models/inventory-item";
import { CreateInventoryItemInput } from "./dtos/inputs/create-inventory-item.input";
import { GetInventoryItemArgs } from "./dtos/args/get-inventory-item.args";
import { EditInventoryItemInput } from "./dtos/inputs/edit-inventory-item.input";

@Resolver()
@UseGuards(UserAuthGuard)
export class InventoryResolver {
  constructor(private inventoryService: InventoryService) {
  }

  @Query(() => [Inventory])
  getInventories(@Args("getInventoryArgs") getInventoryArgs: GetInventoryArgs) {
    return this.inventoryService.getInventories(getInventoryArgs);
  }

  @Query(() => Number)
  getInventoriesCount() {
    return this.inventoryService.getInventoriesCount();
  }

  @Query(() => [InventoryItem])
  getInventoryItems(@Args("getInventoryItemArgs") getInventoryItemArgs: GetInventoryItemArgs) {
    return this.inventoryService.getInventoryItems(getInventoryItemArgs);
  }

  @Query(() => Number)
  getInventoryItemsCount() {
    return this.inventoryService.getInventoryItemsCount();
  }

  @Mutation(() => Inventory)
  createInventory(@Args("createInventoryInput") createInventoryInput: CreateInventoryInput) {
    return this.inventoryService.createInventory(createInventoryInput);
  }

  @Mutation(() => ({ success: Boolean }))
  editInventory(@Args("editInventoryInput") editInventoryInput: EditInventoryInput) {
    return this.inventoryService.editInventory(editInventoryInput);
  }

  @UsePipes(new ObjectIdValidatorPipe())
  @Mutation(() => ({ success: Boolean }))
  deleteInventory(@Args("inventoryId") inventoryId: string) {
    return this.inventoryService.deleteInventory(inventoryId);
  }

  @Mutation(() => InventoryItem)
  createInventoryItem(@Args("createInventoryItemInput") createInventoryItemInput: CreateInventoryItemInput) {
    return this.inventoryService.createInventoryItem(createInventoryItemInput);
  }

  @Mutation(() => ({ success: Boolean }))
  editInventoryItem(@Args("editInventoryItemInput") editInventoryItemInput: EditInventoryItemInput) {
    return this.inventoryService.editInventoryItem(editInventoryItemInput);
  }

  @UsePipes(new ObjectIdValidatorPipe())
  @Mutation(() => ({ success: Boolean }))
  deleteInventoryItem(@Args("inventoryItemId") inventoryItemId: string) {
    return this.inventoryService.deleteInventoryItem(inventoryItemId);
  }
}