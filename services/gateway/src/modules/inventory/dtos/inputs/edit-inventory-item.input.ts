import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectIdScalar } from "../../../../scallers/object-id.scalar";
import { BaseInventoryItemInput } from "./base-inventory.item.input";

@InputType()
export class EditInventoryItemInput extends BaseInventoryItemInput {
  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsString()
  inventoryItemId: string;
}