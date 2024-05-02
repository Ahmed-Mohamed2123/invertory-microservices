import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ObjectIdScalar } from "../../../../scallers/object-id.scalar";

@ArgsType()
export class GetInventoryItemArgs {
  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsString()
  inventoryId: string;
}