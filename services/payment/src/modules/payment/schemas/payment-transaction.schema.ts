import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { TransactionStatus } from "../enums/transaction-status.enum";
import { PaymentType } from "../enums/payment-type.enum";
import { PaymentStatus } from "../enums/payment-status.enum";

export type PaymentTransactionDocument = PaymentTransaction & Document;

@Schema({
  timestamps: true,
  collection: "payments-transactions"
})
export class PaymentTransaction extends Document {
  @Prop({
    type: String,
    required: true,
    enum: TransactionStatus
  })
  transactionStatus: string;

  @Prop({
    type: String,
    required: true,
    enum: PaymentType
  })
  paymentType: string;

  @Prop({
    type: String,
    required: true,
    enum: PaymentStatus
  })
  paymentStatus: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  customerDetails: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  paymentDetails: Record<string, any>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  failedReason: Record<string, any>;

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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PaymentTransactionSchema = SchemaFactory.createForClass(PaymentTransaction);
