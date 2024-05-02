import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type InvoiceDocument = Invoice & Document;

@Schema({
  timestamps: true,
  collection: "invoices"
})
export class Invoice extends Document {
  @Prop({
    type: Number,
    required: true
  })
  totalAmount: number;

  @Prop({
    type: String,
    required: true
  })
  customerId: string;

  @Prop({
    type: String,
    required: true
  })
  orderId: string;

  @Prop({
    type: String,
    required: true
  })
  paymentTransactionId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
