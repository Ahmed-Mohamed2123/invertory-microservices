import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../../../scallers/object-id.scalar";

@ObjectType("Customer")
export class Customer {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  mobileNumber: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}