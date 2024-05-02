import { IsNotEmpty, IsNumber, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class GetCustomerInvoiceDto {
  @IsNotEmpty()
  @Validate(IsValidObjectId)
  customerId!: string;

  @IsNotEmpty()
  @IsNumber()
  limit!: number;
}