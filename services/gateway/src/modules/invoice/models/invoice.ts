import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ObjectIdScalar } from "../../../scallers/object-id.scalar";

@ObjectType("Invoice")
export class Invoice {
  @Field(() => ObjectIdScalar)
  _id: string;

  @Field(() => Int)
  totalAmount: number;

  @Field(() => ObjectIdScalar)
  customerId: string;

  @Field(() => ObjectIdScalar)
  orderId: string;

  @Field(() => ObjectIdScalar)
  paymentTransactionId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}