import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsePipes } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { ObjectIdValidatorPipe } from "../../pipes/object-id-validator.pipe";
import { Shipment } from "./models/shipment";
import { UpdateShipmentStatusInput } from "./dtos/inputs/update-shipment-status.input";

@Resolver()
export class ShipmentResolver {
  constructor(private shipmentService: ShipmentService) {
  }

  @UsePipes(new ObjectIdValidatorPipe())
  @Query(() => Shipment)
  getCustomerOrdersDetails(@Args("shipmentId") shipmentId: string) {
    return this.shipmentService.getShipmentById(shipmentId);
  }

  @UsePipes(new ObjectIdValidatorPipe())
  @Mutation(() => Shipment)
  initiateShipment(@Args("orderId") orderId: string) {
    return this.shipmentService.initiateShipment(orderId);
  }

  @Mutation(() => ({ success: Boolean }))
  updateShipmentStatus(@Args("updateShipmentStatusInput") updateShipmentStatusInput: UpdateShipmentStatusInput) {
    return this.shipmentService.updateShipmentStatus(updateShipmentStatusInput);
  }
}