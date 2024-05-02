import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { Customer } from "./models/customer";
import { CustomerService } from "./customer.service";
import { UserAuthGuard } from "../../guards/user-auth.guard";
import { CreateCustomerInput } from "./dtos/inputs/create-customer.input";

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private customerService: CustomerService) {
  }

  @Mutation(() => Customer)
  @UseGuards(UserAuthGuard)
  createCustomer(@Args("createCustomerInput") createCustomerInput: CreateCustomerInput) {
    return this.customerService.createCustomer(createCustomerInput);
  }
}