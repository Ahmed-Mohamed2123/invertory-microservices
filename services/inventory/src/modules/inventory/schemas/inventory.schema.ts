import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseSchema } from "../../../database/base.schema";

export type InventoryDocument = Inventory & Document;

@Schema({
  timestamps: true,
  collection: "inventories"
})
export class Inventory extends BaseSchema {
  @Prop({
    type: String,
    unique: true,
    required: true
  })
  name: string;

  @Prop({
    type: String,
    required: true
  })
  location: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
