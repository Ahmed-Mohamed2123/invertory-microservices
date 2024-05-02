import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards, UsePipes } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { ObjectIdValidatorPipe } from "../../pipes/object-id-validator.pipe";
import { GetCustomerInvoiceArgs } from "./dtos/args/get-customer.invoice.args";
import { Invoice } from "./models/invoice";
import { CreateInvoiceInput } from "./dtos/inputs/create-invoice.input";
import { UserAuthGuard } from "../../guards/user-auth.guard";

@Resolver()
@UseGuards(UserAuthGuard)
export class InvoiceResolver {
  constructor(private invoiceService: InvoiceService) {
  }

  @Query(() => Invoice)
  getCustomerInvoices(@Args("getCustomerInvoiceArgs") getCustomerInvoiceArgs: GetCustomerInvoiceArgs) {
    return this.invoiceService.getCustomerInvoices(getCustomerInvoiceArgs);
  }

  @UsePipes(new ObjectIdValidatorPipe())
  @Query(() => Invoice)
  getCustomerInvoicesCount(@Args("customerId") customerId: string) {
    return this.invoiceService.getCustomerInvoicesCount(customerId);
  }

  @Mutation(() => Invoice)
  createInvoice(createInvoiceInput: CreateInvoiceInput) {
    return this.invoiceService.createInvoice(createInvoiceInput);
  }
}