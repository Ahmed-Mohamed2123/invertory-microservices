import { Field, Float, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../../../scallers/object-id.scalar";

@ObjectType("InventoryItem")
export class InventoryItem {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field(() => String)
  name: string;


  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => ObjectIdScalar)
  inventoryId: string;
}