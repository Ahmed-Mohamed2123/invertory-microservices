import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ObjectIdScalar } from "../../../../scallers/object-id.scalar";

@ArgsType()
export class GetCustomerInvoiceArgs {
  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @Field(() => ObjectIdScalar)
  @IsNotEmpty()
  @IsNumber()
  customerId: string;
}