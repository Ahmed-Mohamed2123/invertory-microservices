import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { IsValidMobile } from "../../../../validators/mobile-check.validator";

@InputType()
export class CreateCustomerInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Validate(IsValidMobile)
  @Field(() => String)
  mobileNumber: string;
}