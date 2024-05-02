import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;
}