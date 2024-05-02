import { InputType } from "@nestjs/graphql";
import { OrderDetailInput } from "./order-detail.input";

@InputType()
export class CreateOrderDetailInput {
  orderDetails: OrderDetailInput[];
}