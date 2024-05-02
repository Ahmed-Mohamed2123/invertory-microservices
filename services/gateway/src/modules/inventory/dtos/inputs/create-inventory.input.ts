import { InputType } from "@nestjs/graphql";
import { BaseInventoryInput } from "./base-inventory.input";

@InputType()
export class CreateInventoryInput extends BaseInventoryInput {
}