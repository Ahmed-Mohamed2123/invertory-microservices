import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../../../scallers/object-id.scalar";

@ObjectType("Inventory")
export class Inventory {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => String)
  location: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}