import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Inventory, InventoryDocument } from "../schemas/inventory.schema";
import { _idConvertor } from "../utils/object-id-convertor";
import { IEditInventory } from "../interfaces/edit-inventory.interface";
import { ICreateInventory } from "../interfaces/create-inventory.interface";

@Injectable()
export class InventoryRepository {
  constructor(@InjectModel(Inventory.name) private model: Model<InventoryDocument>) {
  }

  public async getInventories(page: number, limit: number): Promise<Inventory[]> {
    const skippedItems = limit * (page - 1);
    return this.model.find().skip(skippedItems).limit(limit).exec();
  }

  public async getInventoriesCount(): Promise<number> {
    return this.model.countDocuments().exec();
  }

  public async getInventoryById(inventoryId: string) {
    return this.model.findOne({ _id: _idConvertor(inventoryId) }).exec();
  }

  public async getInventoryByName(name: string) {
    return this.model.findOne({ name }).exec();
  }

  public async createInventory(payload: ICreateInventory): Promise<Inventory> {
    return this.model.create(payload);
  }

  public async editInventory(payload: IEditInventory) {
    const { inventoryId, name, location } = payload;
    return this.model.updateOne({
      _id: _idConvertor(inventoryId)
    }, {
      $set: {
        ...(!!name && { name }),
        ...(!!location && { location })
      }
    }).exec();
  }

  public async deleteInventory(inventoryId: string) {
    return this.model.deleteOne({ _id: _idConvertor(inventoryId) }).exec();
  }
}