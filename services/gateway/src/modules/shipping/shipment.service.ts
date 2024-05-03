import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { RmqRecordOptions } from "@nestjs/microservices/record-builders/rmq.record-builder";
import { ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { UpdateShipmentStatusInput } from "./dtos/inputs/update-shipment-status.input";
import { Shipment, ShipmentStatusUpdateResponse } from "../../schemas/graphql";

@Injectable()
export class ShipmentService {
  private readonly rmqRecordOptions: RmqRecordOptions;

  constructor(@Inject(ClientName.SHIPMENT) private shipmentClient: ClientProxy,
              private configService: ConfigService,) {
    this.rmqRecordOptions = {
      headers: {
        ["SERVICE-KEY"]: this.configService.get("SHIPMENT_SERVICE_KEY")
      },
      priority: 3
    };
  }

  public async getShipmentById(shipmentId: string): Promise<Shipment> {
    const messagePayload = new RmqRecord(shipmentId, this.rmqRecordOptions);

    const execution$ = this.shipmentClient.send("get-shipment-by-id", messagePayload);
    return lastValueFrom(execution$);
  }

  public async initiateShipment(orderId: string): Promise<Shipment> {
    const messagePayload = new RmqRecord(orderId, this.rmqRecordOptions);

    const execution$ = this.shipmentClient.send("initiate-shipment", messagePayload);
    return lastValueFrom(execution$);
  }

  public async updateShipmentStatus(updateShipmentStatusInput: UpdateShipmentStatusInput): Promise<ShipmentStatusUpdateResponse> {
    const messagePayload = new RmqRecord(updateShipmentStatusInput, this.rmqRecordOptions);

    const execution$ = this.shipmentClient.send("update-shipment-status", messagePayload);
    return lastValueFrom(execution$);
  }
}