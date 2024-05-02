import { Controller, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dtos/create-customer.dto";

@Controller("customer")
export class CustomerController {
  constructor(private customerService: CustomerService) {
  }

  @MessagePattern("create-customer")
  createUser(@Payload(ValidationPipe) createCustomerDto: CreateCustomerDto,
             @Ctx() context: RmqContext) {
    return this.customerService.createCustomer(createCustomerDto, context);
  }
}