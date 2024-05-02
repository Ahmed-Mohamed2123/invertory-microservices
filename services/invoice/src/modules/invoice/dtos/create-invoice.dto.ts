import { IsNotEmpty, IsNumber, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class CreateInvoiceDto {
  @IsNotEmpty()
  @Validate(IsValidObjectId)
  orderId!: string;

  @IsNotEmpty()
  @Validate(IsValidObjectId)
  paymentTransactionId!: string;

  @IsNotEmpty()
  @Validate(IsValidObjectId)
  customerId!: string;

  @IsNotEmpty()
  @IsNumber()
  totalAmount!: number;
}