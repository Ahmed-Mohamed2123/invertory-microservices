import { IsNotEmpty, IsString, Validate } from "class-validator";
import { IsValidObjectId } from "../validators/object-id.validator";

export class UpdateShipmentStatusDto {
  @IsNotEmpty()
  @Validate(IsValidObjectId)
  shipmentId!: string;

  @IsNotEmpty()
  @IsString()
  deliveryStatus!: string;
}