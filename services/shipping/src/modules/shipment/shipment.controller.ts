import { Controller, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { ShipmentService } from "./shipment.service";
import { ObjectIdValidatorPipe } from "./pipes/object-id-validator.pipe";
import { UpdateShipmentStatusDto } from "./dtos/update-shipment-status.dto";

@Controller("shipment")
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {
  }

  @MessagePattern("get-shipment-by-id")
  getShipmentById(@Payload(ObjectIdValidatorPipe) shipmentId: string,
                  @Ctx() context: RmqContext) {
    return this.shipmentService.getShipmentById(shipmentId, context);
  }

  @MessagePattern("initiate-shipment")
  initiateShipment(@Payload(ObjectIdValidatorPipe) orderId: string,
                   @Ctx() context: RmqContext) {
    return this.shipmentService.initiateShipment(orderId, context);
  }

  @MessagePattern("update-shipment-status")
  updateShipmentStatus(@Payload(ValidationPipe) updateShipmentStatusDto: UpdateShipmentStatusDto,
                       @Ctx() context: RmqContext) {
    return this.shipmentService.updateShipmentStatus(updateShipmentStatusDto, context);
  }
}