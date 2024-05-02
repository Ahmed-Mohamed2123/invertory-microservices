import { Injectable } from "@nestjs/common";
import { from, lastValueFrom, map, tap } from "rxjs";
import { RmqContext } from "@nestjs/microservices";
import { OrderDetailRepository } from "./repositories/order-detail.repository";
import { OrderRepository } from "./repositories/order.repository";
import { CreateOrderDetailDto } from "./dtos/create-order-detail.dto";
import { ICustomerOrderDetail } from "./interfaces/customer-order-detail.interface";
import { confirmMessageProcessing } from "../../helpers/rabbitmq-message-confirmation";

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository,
              private orderDetailService: OrderDetailRepository) {
  }

  public async getCustomerOrdersDetails(customerId: string,
                                        context: RmqContext): Promise<ICustomerOrderDetail[]> {
    let customerOrdersDetails: ICustomerOrderDetail[];

    const customerOrdersDetailsStream$ = from(this.orderRepository.getCustomerOrdersDetails(customerId)).pipe(
      tap((foundCustomerOrdersDetails: ICustomerOrderDetail[]) => customerOrdersDetails = foundCustomerOrdersDetails)
    );

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = customerOrdersDetailsStream$.pipe(
      confirmMessageProcessingStream$(),
      map(() => customerOrdersDetails)
    );

    return lastValueFrom(execution$);
  }

  public async initiateOrder(customerId: string,
                             context: RmqContext) {
    const orderCreationStream$ = from(this.orderRepository.initiateOrder(customerId));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = orderCreationStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async acceptOrder(orderId: string,
                           context: RmqContext) {
    const orderAcceptanceStream$ = from(this.orderRepository.acceptOrder(orderId));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = orderAcceptanceStream$.pipe(
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }

  public async rejectOrder(orderId: string,
                           context: RmqContext) {
    const orderRejectionStream$ = from(this.orderRepository.rejectOrder(orderId));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = orderRejectionStream$.pipe(
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }

  public async createOrderDetails(createOrderDetailDto: CreateOrderDetailDto,
                                  context: RmqContext) {
    const { orderDetails } = createOrderDetailDto;
    const orderRejectionStream$ = from(this.orderDetailService.createOrderDetails(orderDetails));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = orderRejectionStream$.pipe(
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }
}