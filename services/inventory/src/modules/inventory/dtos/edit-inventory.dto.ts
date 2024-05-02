import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditInventoryDto {
  @IsNotEmpty()
  @IsString()
  inventoryId!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;
}