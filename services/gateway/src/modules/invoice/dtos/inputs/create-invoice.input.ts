import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ObjectIdScalar } from "../../../../scallers/object-id.scalar";

@InputType()
export class CreateInvoiceInput {
  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsNumber()
  orderId: string;

  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsNumber()
  paymentTransactionId: string;

  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsNumber()
  customerId: string;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;
}