import { IsNotEmpty, IsNumber, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class GetInventoryItemDto {
  @IsNotEmpty()
  @IsNumber()
  page!: number;

  @IsNotEmpty()
  @IsNumber()
  limit!: number;

  @IsNotEmpty()
  @Validate(IsValidObjectId)
  inventoryId!: string;
}