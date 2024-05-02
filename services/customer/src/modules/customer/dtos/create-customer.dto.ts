import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  mobileNumber!: string;
}