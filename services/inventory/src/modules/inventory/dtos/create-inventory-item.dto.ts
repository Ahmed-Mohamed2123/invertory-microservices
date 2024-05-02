import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class CreateInventoryItemDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsNotEmpty()
  @Validate(IsValidObjectId)
  inventoryId!: string;
}