import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { _idConvertor } from "../utils/object-id-convertor";
import { InventoryItem, InventoryItemDocument } from "../schemas/inventory-item.schema";
import { IGetInventoryItem } from "../interfaces/get-inventory-item.interface";
import { ICreateInventoryItem } from "../interfaces/create-inventory-item.interface";
import { IEditInventoryItem } from "../interfaces/edit-inventory-item.interface";

@Injectable()
export class InventoryItemRepository {
  constructor(@InjectModel(InventoryItem.name) private model: Model<InventoryItemDocument>) {
  }

  public async getInventoryItems(payload: IGetInventoryItem): Promise<InventoryItem[]> {
    const { inventoryId, page, limit } = payload;
    const skippedItems = limit * (page - 1);
    return this.model.find({ inventoryId }).skip(skippedItems).limit(limit).exec();
  }

  public async getInventoryItemsCount(inventoryId: string): Promise<number> {
    return this.model.countDocuments({ inventoryId }).exec();
  }

  public async getInventoryItem(inventoryItemId: string): Promise<InventoryItem> {
    return this.model.findOne({ _id: _idConvertor(inventoryItemId) }).exec();
  }

  public async createInventoryItem(payload: ICreateInventoryItem): Promise<InventoryItem> {
    return this.model.create(payload);
  }

  public async editInventoryItem(payload: IEditInventoryItem) {
    const { inventoryItemId, price, name, description } = payload;
    return this.model.updateOne({
      _id: _idConvertor(inventoryItemId)
    }, {
      $set: {
        ...(!!name && { name }),
        ...(!!description && { description }),
        ...(!!price && { price })
      }
    }).exec();
  }

  public async deleteInventoryItem(inventoryItemId: string) {
    return this.model.deleteOne({ _id: _idConvertor(inventoryItemId) }).exec();
  }

  public async deleteInventoryItemsByInventoryId(inventoryId: string) {
    return this.model.deleteMany({ inventoryId }).exec();
  }
}