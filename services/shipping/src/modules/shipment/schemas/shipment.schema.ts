import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DeliveryStatus } from "../enums/delivery-status.enum";

export type ShipmentDocument = Shipment & Document;

@Schema({
  timestamps: true,
  collection: "shipments"
})
export class Shipment extends Document {
  @Prop({
    type: String,
    required: true
  })
  orderId: string;

  @Prop({
    type: String,
    required: true,
    enum: DeliveryStatus
  })
  deliveryStatus: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
