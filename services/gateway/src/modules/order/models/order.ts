import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectIdScalar } from "../../../scallers/object-id.scalar";

@ObjectType("Order")
export class Order {
  @Field(() => ObjectIdScalar)
  _id: string;

  @Field(() => String)
  status: string;

  @Field(() => ObjectIdScalar)
  customerId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}