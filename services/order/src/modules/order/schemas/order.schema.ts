import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseSchema } from "../../../shared/database/base.schema";
import { OrderStatus } from "../enums/order-status.enum";

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
  collection: "orders"
})
export class Order extends BaseSchema {
  @Prop({
    type: String,
    enum: OrderStatus,
    required: true
  })
  status: string;

  @Prop({
    type: String,
    required: true
  })
  customerId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
