import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schemas/order.schema";
import { OrderDetail, OrderDetailSchema } from "./schemas/order-detail.schema";
import { OrderRepository } from "./repositories/order.repository";
import { OrderDetailRepository } from "./repositories/order-detail.repository";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      },
      {
        name: OrderDetail.name,
        schema: OrderDetailSchema
      }
    ])
  ],
  providers: [
    OrderService,
    OrderRepository,
    OrderDetailRepository
  ],
  controllers: [
    OrderController
  ]
})
export class OrderModule {
}