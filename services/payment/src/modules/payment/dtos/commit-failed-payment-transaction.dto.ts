import { IsNotEmpty, IsObject, IsString, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class CommitFailedPaymentTransactionDto {
  @IsNotEmpty()
  @Validate(IsValidObjectId)
  paymentTransactionId!: string;

  @IsNotEmpty()
  @IsObject()
  failedReason: Record<string, any>;

  @IsNotEmpty()
  @IsString()
  paymentStatus!: string;

  @IsNotEmpty()
  @IsString()
  paymentType!: string;
}