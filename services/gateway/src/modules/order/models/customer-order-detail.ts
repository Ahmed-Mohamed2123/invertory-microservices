import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectIdScalar } from "../../../scallers/object-id.scalar";
import { OrderDetail } from "./order-detail";

@ObjectType("CustomerOrderDetail")
export class CustomerOrderDetail {
  @Field(() => ObjectIdScalar)
  _id: string;

  @Field(() => String)
  status: string;

  @Field(() => ObjectIdScalar)
  customerId: string;

  @Field(() => [OrderDetail])
  orderDetails: OrderDetail[];
}