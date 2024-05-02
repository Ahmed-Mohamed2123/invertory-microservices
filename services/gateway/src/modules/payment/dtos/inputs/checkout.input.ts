import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectIdScalar } from "../../../../scallers/object-id.scalar";

@InputType()
export class CheckoutInput {
  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  source: string;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}