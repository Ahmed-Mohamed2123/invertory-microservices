import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectIdScalar } from "../../../scallers/object-id.scalar";

@ObjectType("Shipment")
export class Shipment {
  @Field(() => ObjectIdScalar)
  _id: string;

  @Field(() => ObjectIdScalar)
  orderId: string;

  @Field(() => String)
  deliveryStatus: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}