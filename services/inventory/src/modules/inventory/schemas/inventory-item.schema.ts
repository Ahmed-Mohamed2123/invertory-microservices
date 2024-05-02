import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseSchema } from "../../../database/base.schema";

export type InventoryItemDocument = InventoryItem & Document;

@Schema({
  timestamps: true,
  collection: "inventories-items"
})
export class InventoryItem extends BaseSchema {
  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Prop({
    type: String
  })
  description: string;

  @Prop({
    type: Number
  })
  price: number;

  @Prop({
    type: String,
    required: true
  })
  inventoryId: string;
}

export const InventoryItemSchema = SchemaFactory.createForClass(InventoryItem);
