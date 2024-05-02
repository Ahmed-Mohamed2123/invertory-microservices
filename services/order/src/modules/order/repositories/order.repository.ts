import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order, OrderDocument } from "../schemas/order.schema";
import { OrderStatus } from "../enums/order-status.enum";
import { _idConvertor, _idDestructor } from "../utils/object-id-convertor";
import { ICustomerOrderDetail } from "../interfaces/customer-order-detail.interface";

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>) {
  }

  public async getCustomerOrdersDetails(customerId: string): Promise<ICustomerOrderDetail[]> {
    return this.model.aggregate([
      { $match: { customerId: _idDestructor(customerId) } },
      {
        $lookup: {
          from: "orders-details",
          let: { orderId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$orderId", { $convert: { input: "$$orderId", to: "string" } }] } } }
          ],
          as: "orderDetails"
        }
      }
    ]).exec();
  }

  public async initiateOrder(customerId: string): Promise<Order> {
    return this.model.create({
      customerId,
      status: OrderStatus.IN_HOLD
    });
  }

  public async acceptOrder(orderId: string) {
    return this.model.updateOne({
      _id: _idConvertor(orderId)
    }, {
      $set: {
        status: OrderStatus.ACCEPTED
      }
    }).exec();
  }

  public async rejectOrder(orderId: string) {
    return this.model.updateOne({
      _id: _idConvertor(orderId)
    }, {
      $set: {
        status: OrderStatus.REJECTED
      }
    }).exec();
  }
}