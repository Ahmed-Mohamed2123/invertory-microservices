import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CustomerDocument = Customer & Document;

@Schema({
  timestamps: true,
  collection: "customers"
})
export class Customer extends Document {
  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String })
  last_name: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  mobileNumber: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
