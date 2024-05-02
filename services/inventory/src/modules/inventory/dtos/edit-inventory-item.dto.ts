import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class EditInventoryItemDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsNotEmpty()
  @Validate(IsValidObjectId)
  inventoryItemId!: string;
}