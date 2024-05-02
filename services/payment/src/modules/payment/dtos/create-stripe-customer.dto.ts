import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateStripeCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  source: string;
}