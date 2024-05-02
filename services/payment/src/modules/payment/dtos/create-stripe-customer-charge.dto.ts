import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStripeCustomerChargeDto {
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @IsNotEmpty()
  @IsString()
  source: string;
}