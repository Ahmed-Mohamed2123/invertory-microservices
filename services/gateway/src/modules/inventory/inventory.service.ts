import { Inject, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { RmqRecordOptions } from "@nestjs/microservices/record-builders/rmq.record-builder";
import { ClientName } from "../../enums/client-name.enum";
import { CreateInventoryInput } from "./dtos/inputs/create-inventory.input";
import { DeleteInventoryItemResponse, EditInventoryItemResponse, Inventory } from "../../schemas/graphql";
import { GetInventoryArgs } from "./dtos/args/get-inventory.args";
import { EditInventoryInput } from "./dtos/inputs/edit-inventory.input";
import { CreateInventoryItemInput } from "./dtos/inputs/create-inventory-item.input";
import { GetInventoryItemArgs } from "./dtos/args/get-inventory-item.args";
import { EditInventoryItemInput } from "./dtos/inputs/edit-inventory-item.input";
import { InventoryItem } from "./models/inventory-item";

@Injectable()
export class InventoryService {
  private readonly rmqRecordOptions: RmqRecordOptions;

  constructor(@Inject(ClientName.INVENTORY) private inventoryClient: ClientProxy,
              private configService: ConfigService) {
    this.rmqRecordOptions = {
      headers: {
        ['SERVICE-KEY']: this.configService.get("INVENTORY_SERVICE_KEY")
      },
      priority: 3,
    }
  }

  public async getInventories(getInventoryArgs: GetInventoryArgs): Promise<Inventory[]> {
    const messagePayload = new RmqRecord(getInventoryArgs, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("get-inventories", messagePayload);
    return lastValueFrom(execution$);
  }

  public async getInventoriesCount(): Promise<Number> {
    const messagePayload = new RmqRecord({}, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("get-inventories-count", messagePayload);
    return lastValueFrom(execution$);
  }

  public async createInventory(createInventoryInput: CreateInventoryInput): Promise<Inventory> {
    const messagePayload = new RmqRecord(createInventoryInput, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("create-inventory", messagePayload);
    return lastValueFrom(execution$);
  }

  public async editInventory(editInventoryInput: EditInventoryInput): Promise<Inventory> {
    const messagePayload = new RmqRecord(editInventoryInput, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("edit-inventory", messagePayload);
    return lastValueFrom(execution$);
  }

  public async deleteInventory(inventoryId: string) {
    const messagePayload = new RmqRecord(inventoryId, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("delete-inventory", messagePayload);
    return lastValueFrom(execution$);
  }

  public async getInventoryItems(getInventoryItemArgs: GetInventoryItemArgs): Promise<InventoryItem[]> {
    const messagePayload = new RmqRecord(getInventoryItemArgs, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("get-inventory-Items", messagePayload);
    return lastValueFrom(execution$);
  }

  public async getInventoryItemsCount(): Promise<Number> {
    const messagePayload = new RmqRecord({}, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("get-inventory-Items-count", messagePayload);
    return lastValueFrom(execution$);
  }

  public async createInventoryItem(createInventoryItemInput: CreateInventoryItemInput): Promise<InventoryItem> {
    const messagePayload = new RmqRecord(createInventoryItemInput, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("create-inventory-item", messagePayload);
    return lastValueFrom(execution$);
  }

  public async editInventoryItem(editInventoryItemInput: EditInventoryItemInput): Promise<EditInventoryItemResponse> {
    const messagePayload = new RmqRecord(editInventoryItemInput, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("edit-inventory-item", messagePayload);
    return lastValueFrom(execution$);
  }

  public async deleteInventoryItem(inventoryItemId: string): Promise<DeleteInventoryItemResponse> {
    const messagePayload = new RmqRecord(inventoryItemId, this.rmqRecordOptions);

    const execution$ = this.inventoryClient.send("delete-inventory-item", messagePayload);
    return lastValueFrom(execution$);
  }
}