import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";

@ArgsType()
export class GetInventoryArgs {
  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  limit: number;
}