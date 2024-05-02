import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderDetail, OrderDetailDocument } from "../schemas/order-detail.schema";
import { IOrderDetail } from "../interfaces/order-detail.interface";

@Injectable()
export class OrderDetailRepository {
  constructor(@InjectModel(OrderDetail.name) private model: Model<OrderDetailDocument>) {
  }

  public async createOrderDetails(payload: IOrderDetail[]) {
    return this.model.insertMany(payload);
  }
}