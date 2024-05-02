import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectIdScalar } from "../../../../scallers/object-id.scalar";
import { BaseInventoryItemInput } from "./base-inventory.item.input";

@InputType()
export class CreateInventoryItemInput extends BaseInventoryItemInput {
  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsString()
  inventoryId: string;
}