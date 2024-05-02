import { OrderDetail } from "../schemas/order-detail.schema";
import { ObjectId } from "mongodb";

export interface ICustomerOrderDetail {
  _id: ObjectId;
  status: string;
  customerId: ObjectId;
  orderDetails: OrderDetail[];
}