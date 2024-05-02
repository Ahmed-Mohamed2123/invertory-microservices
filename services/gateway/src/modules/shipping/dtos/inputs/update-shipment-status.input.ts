import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectIdScalar } from "../../../../scallers/object-id.scalar";

@InputType()
export class UpdateShipmentStatusInput {
  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsString()
  shipmentId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  deliveryStatus: string;
}