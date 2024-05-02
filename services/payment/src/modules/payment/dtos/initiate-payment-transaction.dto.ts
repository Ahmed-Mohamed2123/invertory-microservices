import { IsNotEmpty, IsObject, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class InitiatePaymentTransactionDto {
  @IsNotEmpty()
  @Validate(IsValidObjectId)
  customerId!: string;

  @IsNotEmpty()
  @Validate(IsValidObjectId)
  orderId!: string;

  @IsNotEmpty()
  @IsObject()
  customerDetails!: Record<string, any>;
}