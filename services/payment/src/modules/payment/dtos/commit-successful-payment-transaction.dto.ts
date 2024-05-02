import { IsNotEmpty, IsObject, IsString, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class CommitSuccessfulPaymentTransactionDto {
  @IsNotEmpty()
  @Validate(IsValidObjectId)
  paymentTransactionId!: string;

  @IsNotEmpty()
  @IsObject()
  paymentDetails: Record<string, any>;

  @IsNotEmpty()
  @IsString()
  paymentStatus!: string;

  @IsNotEmpty()
  @IsString()
  paymentType!: string;
}