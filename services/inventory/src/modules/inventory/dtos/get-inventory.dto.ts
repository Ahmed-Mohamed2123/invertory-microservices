import { IsNotEmpty, IsNumber } from "class-validator";

export class GetInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  page!: number;

  @IsNotEmpty()
  @IsNumber()
  limit!: number;
}