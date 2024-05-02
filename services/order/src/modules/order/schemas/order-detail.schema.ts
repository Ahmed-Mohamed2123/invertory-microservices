import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseSchema } from "../../../shared/database/base.schema";

export type OrderDetailDocument = OrderDetail & Document;

@Schema({
  timestamps: true,
  collection: "orders-details"
})
export class OrderDetail extends BaseSchema {
  @Prop({
    type: Number,
    required: true
  })
  quantity: number;

  @Prop({
    type: Number,
    required: true
  })
  price: number;

  @Prop({
    type: String,
    required: true
  })
  orderId: string;

  @Prop({
    type: String,
    required: true
  })
  inventoryItemId: string;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
