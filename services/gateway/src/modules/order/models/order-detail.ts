import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectIdScalar } from "../../../scallers/object-id.scalar";

@ObjectType("OrderDetail")
export class OrderDetail {
  @Field(() => ObjectIdScalar)
  _id: string;

  @Field(() => Int)
  quantity: string;

  @Field(() => Int)
  price: string;

  @Field(() => ObjectIdScalar)
  inventoryItemId: string;

  @Field(() => ObjectIdScalar)
  orderId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}