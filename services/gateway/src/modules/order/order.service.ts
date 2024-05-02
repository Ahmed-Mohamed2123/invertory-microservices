import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { RmqRecordOptions } from "@nestjs/microservices/record-builders/rmq.record-builder";
import { ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { CreateOrderDetailInput } from "./dtos/inputs/create-order-detail.input";
import {
  CustomerOrderDetail,
  Order,
  OrderAcceptionResponse,
  OrderDetailCreationResponse,
  OrderRejectionResponse
} from "../../schemas/graphql";

@Injectable()
export class OrderService {
  private readonly rmqRecordOptions: RmqRecordOptions;

  constructor(@Inject(ClientName.ORDER) private orderClient: ClientProxy,
              private configService: ConfigService) {
    this.rmqRecordOptions = {
      headers: {
        ["API-KEY"]: this.configService.get("ORDER_API_KEY")
      },
      priority: 3
    };
  }

  public async getCustomerOrdersDetails(customerId: string): Promise<CustomerOrderDetail[]> {
    const messagePayload = new RmqRecord(customerId, this.rmqRecordOptions);

    const execution$ = this.orderClient.send("get-customer-orders-details", messagePayload);
    return lastValueFrom(execution$);
  }

  public async initiateOrder(customerId: string): Promise<Order> {
    const messagePayload = new RmqRecord(customerId, this.rmqRecordOptions);

    const execution$ = this.orderClient.send("initiate-order", messagePayload);
    return lastValueFrom(execution$);
  }

  public async acceptOrder(orderId: string): Promise<OrderAcceptionResponse> {
    const messagePayload = new RmqRecord(orderId, this.rmqRecordOptions);

    const execution$ = this.orderClient.send("accept-order", messagePayload);
    return lastValueFrom(execution$);
  }

  public async rejectOrder(orderId: string): Promise<OrderRejectionResponse> {
    const messagePayload = new RmqRecord(orderId, this.rmqRecordOptions);

    const execution$ = this.orderClient.send("reject-order", messagePayload);
    return lastValueFrom(execution$);
  }

  public async createOrderDetails(createOrderDetailInput: CreateOrderDetailInput): Promise<OrderDetailCreationResponse> {
    const messagePayload = new RmqRecord(createOrderDetailInput, this.rmqRecordOptions);

    const execution$ = this.orderClient.send("create-order-details", messagePayload);
    return lastValueFrom(execution$);
  }
}