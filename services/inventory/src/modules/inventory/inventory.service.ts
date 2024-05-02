import { Injectable } from "@nestjs/common";
import { concatMap, from, lastValueFrom, map, of, tap, throwError } from "rxjs";
import { RmqContext, RpcException } from "@nestjs/microservices";
import { InventoryRepository } from "./repositories/inventory.repository";
import { InventoryItemRepository } from "./repositories/inventory-item.repository";
import { Inventory } from "./schemas/inventory.schema";
import { InventoryItem } from "./schemas/inventory-item.schema";
import { confirmMessageProcessing } from "../../helpers/rabbitmq-message-confirmation";
import { GetInventoryDto } from "./dtos/get-inventory.dto";
import { GetInventoryItemDto } from "./dtos/get-inventory-item.dto";
import { IGetInventoryItem } from "./interfaces/get-inventory-item.interface";
import { CreateInventoryDto } from "./dtos/create-inventory.dto";
import { ICreateInventory } from "./interfaces/create-inventory.interface";
import { EditInventoryDto } from "./dtos/edit-inventory.dto";
import { IEditInventory } from "./interfaces/edit-inventory.interface";
import { CreateInventoryItemDto } from "./dtos/create-inventory-item.dto";
import { ICreateInventoryItem } from "./interfaces/create-inventory-item.interface";
import { EditInventoryItemDto } from "./dtos/edit-inventory-item.dto";
import { IEditInventoryItem } from "./interfaces/edit-inventory-item.interface";


@Injectable()
export class InventoryService {
  constructor(private inventoryRepository: InventoryRepository,
              private inventoryItemRepository: InventoryItemRepository) {
  }

  public async getInventories(getInventoryDto: GetInventoryDto,
                              context: RmqContext) {
    const { page, limit } = getInventoryDto;

    const inventoriesStream$ = from(this.inventoryRepository.getInventories(page, limit));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoriesStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async getInventoriesCount(context: RmqContext) {
    const inventoriesCountStream$ = from(this.inventoryRepository.getInventoriesCount());

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoriesCountStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async getInventoryItems(getInventoryItemDto: GetInventoryItemDto,
                                 context: RmqContext) {
    const inventoryItemsPayload: IGetInventoryItem = getInventoryItemDto;
    const inventoryItemsStream$ = from(this.inventoryItemRepository.getInventoryItems(inventoryItemsPayload));
    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoryItemsStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async getInventoryItemsCount(inventoryId: string,
                                      context: RmqContext) {
    const inventoryItemsCountStream$ = from(this.inventoryItemRepository.getInventoryItemsCount(inventoryId));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoryItemsCountStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async createInventory(createInventoryDto: CreateInventoryDto,
                               context: RmqContext) {
    const { name } = createInventoryDto;
    const inventoryLookupStream$ = from(this.inventoryRepository.getInventoryByName(name)).pipe(
      concatMap((inventory: Inventory) =>
        inventory ?
          throwError(() => new RpcException("Inventory already exists!!!")) : of(inventory)
      )
    );

    const createInventoryStream$ = () => concatMap(() => {
      const payload: ICreateInventory = createInventoryDto;
      return from(this.inventoryRepository.createInventory(payload));
    });

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoryLookupStream$.pipe(
      createInventoryStream$(),
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async editInventory(editInventoryDto: EditInventoryDto,
                             context: RmqContext) {
    const { inventoryId } = editInventoryDto;
    let inventory: Inventory;

    const inventoryLookupStream$ = from(this.inventoryRepository.getInventoryById(inventoryId)).pipe(
      concatMap((inventory: Inventory) =>
        inventory ? of(inventory) : throwError(() => new RpcException("Inventory does not found!!!"))
      ),
      tap((foundInventory: Inventory) => inventory = foundInventory)
    );

    const editInventoryStream$ = () => concatMap(() => {
      const payload: IEditInventory = editInventoryDto;
      return from(this.inventoryRepository.editInventory(payload));
    });

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoryLookupStream$.pipe(
      editInventoryStream$(),
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }

  public async deleteInventory(inventoryId: string,
                               context: RmqContext) {
    let inventory: Inventory;

    const inventoryLookupStream$ = from(this.inventoryRepository.getInventoryById(inventoryId)).pipe(
      concatMap((inventory: Inventory) =>
        inventory ? of(inventory) : throwError(() => new RpcException("Inventory does not found!!!"))
      ),
      tap((foundInventory: Inventory) => inventory = foundInventory)
    );

    const deleteInventoryItemsStream$ = () => concatMap(() => from(this.inventoryItemRepository.deleteInventoryItemsByInventoryId(inventoryId)));
    const deleteInventoryStream$ = () => concatMap(() => from(this.inventoryRepository.deleteInventory(inventoryId)));
    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoryLookupStream$.pipe(
      deleteInventoryItemsStream$(),
      deleteInventoryStream$(),
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }

  public async createInventoryItem(createInventoryItemDto: CreateInventoryItemDto,
                                   context: RmqContext) {
    const inventoryItemCreationPayload: ICreateInventoryItem = createInventoryItemDto;

    const inventoryItemCreationStream$ = from(this.inventoryItemRepository.createInventoryItem(inventoryItemCreationPayload));
    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoryItemCreationStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async editInventoryItem(editInventoryItemDto: EditInventoryItemDto,
                                 context: RmqContext) {
    const { inventoryItemId } = editInventoryItemDto;
    let inventoryItem: InventoryItem;

    const inventoryItemLookupStream$ = from(this.inventoryItemRepository.getInventoryItem(inventoryItemId)).pipe(
      concatMap((inventoryItem: InventoryItem) =>
        inventoryItem ? of(inventoryItem) : throwError(() => new RpcException("Inventory item does not found!!!"))
      ),
      tap((foundInventoryItem: InventoryItem) => inventoryItem = foundInventoryItem)
    );

    const editInventoryItemStream$ = () => concatMap(() => {
      const payload: IEditInventoryItem = editInventoryItemDto;
      return from(this.inventoryItemRepository.editInventoryItem(payload));
    });

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoryItemLookupStream$.pipe(
      editInventoryItemStream$(),
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }

  public async deleteInventoryItem(inventoryItemId: string,
                                   context: RmqContext) {

    const inventoryItemLookupStream$ = from(this.inventoryItemRepository.getInventoryItem(inventoryItemId)).pipe(
      concatMap((inventoryItem: InventoryItem) =>
        inventoryItem ? of(inventoryItem) : throwError(() => new RpcException("Inventory item does not found!!!"))
      )
    );

    const deleteInventoryItemStream$ = () => concatMap(() =>
      from(this.inventoryItemRepository.deleteInventoryItem(inventoryItemId)));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = inventoryItemLookupStream$.pipe(
      deleteInventoryItemStream$(),
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }
}