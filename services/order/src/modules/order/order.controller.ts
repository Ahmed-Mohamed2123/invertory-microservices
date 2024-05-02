import { Controller, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { OrderService } from "./order.service";
import { CreateOrderDetailDto } from "./dtos/create-order-detail.dto";
import { ObjectIdValidatorPipe } from "./pipes/object-id-validator.pipe";

@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {
  }

  @MessagePattern("get-customer-orders-details")
  getCustomerOrdersDetails(@Payload(ObjectIdValidatorPipe) customerId: string,
                           @Ctx() context: RmqContext) {
    return this.orderService.getCustomerOrdersDetails(customerId, context);
  }

  @MessagePattern("initiate-order")
  initiateOrder(@Payload(ObjectIdValidatorPipe) customerId: string,
                @Ctx() context: RmqContext) {
    return this.orderService.initiateOrder(customerId, context);
  }

  @MessagePattern("accept-order")
  acceptOrder(@Payload(ObjectIdValidatorPipe) orderId: string,
              @Ctx() context: RmqContext) {
    return this.orderService.acceptOrder(orderId, context);
  }

  @MessagePattern("reject-order")
  rejectOrder(@Payload(ObjectIdValidatorPipe) orderId: string,
              @Ctx() context: RmqContext) {
    return this.orderService.rejectOrder(orderId, context);
  }

  @MessagePattern("create-order-details")
  createOrderDetails(@Payload(ValidationPipe) createOrderDetailDto: CreateOrderDetailDto,
                     @Ctx() context: RmqContext) {
    return this.orderService.createOrderDetails(createOrderDetailDto, context);
  }
}