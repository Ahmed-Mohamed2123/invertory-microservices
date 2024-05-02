import { Injectable } from "@nestjs/common";
import { concatMap, from, lastValueFrom, map, of, tap, throwError } from "rxjs";
import { RmqContext, RpcException } from "@nestjs/microservices";
import { ShipmentRepository } from "./repositories/shipment.repository";
import { Shipment } from "./schemas/shipment.schema";
import { confirmMessageProcessing } from "../../helpers/rabbitmq-message-confirmation";
import { UpdateShipmentStatusDto } from "./dtos/update-shipment-status.dto";
import { IUpdateShipmentStatus } from "./interfaces/update-shipment-status.interface";

@Injectable()
export class ShipmentService {
  constructor(private shipmentRepository: ShipmentRepository) {
  }

  public async getShipmentById(shipmentId: string,
                               context: RmqContext) {
    const shipmentLookupStream$ = from(this.shipmentRepository.getShipmentById(shipmentId)).pipe(
      concatMap((shipment: Shipment) =>
        shipment ?
          of(shipment) : throwError(() => new RpcException("Shipment does not found!!!")))
    );

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = shipmentLookupStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async initiateShipment(orderId: string,
                                context: RmqContext) {
    const shipmentInitiationStream$ = from(this.shipmentRepository.initiateShipment(orderId));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = shipmentInitiationStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async updateShipmentStatus(updateShipmentStatusDto: UpdateShipmentStatusDto,
                                    context: RmqContext) {
    const { shipmentId } = updateShipmentStatusDto;

    const shipmentLookupStream$ = from(this.shipmentRepository.getShipmentById(shipmentId)).pipe(
      concatMap((shipment: Shipment) =>
        shipment ?
          of(shipment) : throwError(() => new RpcException("Shipment does not found!!!")))
    );

    const updateShipmentStatusStream$ = () => concatMap(() => {
      const payload: IUpdateShipmentStatus = updateShipmentStatusDto;
      return from(this.shipmentRepository.updateShipmentStatus(payload));
    });

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = shipmentLookupStream$.pipe(
      updateShipmentStatusStream$(),
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }
}