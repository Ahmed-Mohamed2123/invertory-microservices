import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectIdScalar } from "../../../../scallers/object-id.scalar";
import { BaseInventoryInput } from "./base-inventory.input";

@InputType()
export class EditInventoryInput extends BaseInventoryInput {
  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsString()
  inventoryId: string;
}