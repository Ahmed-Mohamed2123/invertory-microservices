import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectIdScalar } from "../../../../scallers/object-id.scalar";

@InputType()
export class OrderDetailInput {
  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsString()
  inventoryItemId: string;

  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  price: number;
}