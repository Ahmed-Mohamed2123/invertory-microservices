import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { CustomerOrderDetail } from "./models/customer-order-detail";
import { Order } from "./models/order";
import { CreateOrderDetailInput } from "./dtos/inputs/create-order-detail.input";
import { UseGuards, UsePipes } from "@nestjs/common";
import { ObjectIdValidatorPipe } from "../../pipes/object-id-validator.pipe";
import { UserAuthGuard } from "../../guards/user-auth.guard";

@Resolver()
@UseGuards(UserAuthGuard)
export class OrderResolver {
  constructor(private orderService: OrderService) {
  }

  @UsePipes(new ObjectIdValidatorPipe())
  @Query(() => CustomerOrderDetail)
  getCustomerOrdersDetails(@Args("customerId") customerId: string) {
    return this.orderService.getCustomerOrdersDetails(customerId);
  }

  @UsePipes(new ObjectIdValidatorPipe())
  @Mutation(() => Order)
  initiateOrder(@Args("customerId") customerId: string) {
    return this.orderService.initiateOrder(customerId);
  }

  @UsePipes(new ObjectIdValidatorPipe())
  @Mutation(() => ({ success: Boolean }))
  acceptOrder(@Args("orderId") orderId: string) {
    return this.orderService.acceptOrder(orderId);
  }

  @UsePipes(new ObjectIdValidatorPipe())
  @Mutation(() => ({ success: Boolean }))
  rejectOrder(@Args("orderId") orderId: string) {
    return this.orderService.rejectOrder(orderId);
  }

  @Mutation(() => ({ success: Boolean }))
  createOrderDetails(@Args("createOrderDetailInput") createOrderDetailInput: CreateOrderDetailInput) {
    return this.orderService.createOrderDetails(createOrderDetailInput);
  }
}