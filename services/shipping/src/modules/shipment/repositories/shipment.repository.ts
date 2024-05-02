import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Shipment, ShipmentDocument } from "../schemas/shipment.schema";
import { Model } from "mongoose";
import { DeliveryStatus } from "../enums/delivery-status.enum";
import { _idConvertor } from "../utils/object-id-convertor";
import { IUpdateShipmentStatus } from "../interfaces/update-shipment-status.interface";

@Injectable()
export class ShipmentRepository {
  constructor(@InjectModel(Shipment.name) private model: Model<ShipmentDocument>) {
  }

  public async getShipmentById(shipmentId: string): Promise<Shipment> {
    return this.model.findOne({
      _id: _idConvertor(shipmentId)
    }).exec();
  }

  public async initiateShipment(orderId: string): Promise<Shipment> {
    return this.model.create({
      orderId,
      deliveryStatus: DeliveryStatus.PENDING
    });
  }

  public async updateShipmentStatus(payload: IUpdateShipmentStatus) {
    const { deliveryStatus, shipmentId } = payload;
    return this.model.updateOne({
      _id: _idConvertor(shipmentId)
    }, {
      $set: {
        deliveryStatus
      }
    }).exec();
  }
}