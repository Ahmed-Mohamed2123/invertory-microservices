import { IsNotEmpty, IsNumber, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class OrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Validate(IsValidObjectId)
  orderId: number;

  @IsNotEmpty()
  @Validate(IsValidObjectId)
  inventoryItemId: number;
}