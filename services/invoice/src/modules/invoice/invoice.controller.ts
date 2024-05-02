import { Controller, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { InvoiceService } from "./invoice.service";
import { GetCustomerInvoiceDto } from "./dtos/get-customer-invoice.dto";
import { CreateInvoiceDto } from "./dtos/create-invoice.dto";
import { ObjectIdValidatorPipe } from "./pipes/object-id-validator.pipe";

@Controller("invoice")
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {
  }

  @MessagePattern('get-customer-invoices')
  getCustomerInvoices(@Payload(ValidationPipe) getCustomerInvoiceDto: GetCustomerInvoiceDto,
                      @Ctx() context: RmqContext) {
    return this.invoiceService.getCustomerInvoices(getCustomerInvoiceDto, context);
  }

  @MessagePattern('get-customer-invoices-count')
  getCustomerInvoicesCount(@Payload(ObjectIdValidatorPipe) customerId: string,
                           @Ctx() context: RmqContext) {
    return this.invoiceService.getCustomerInvoicesCount(customerId, context);
  }

  @MessagePattern('create-invoice')
  createInvoice(@Payload(ValidationPipe) createInvoiceDto: CreateInvoiceDto,
                @Ctx() context: RmqContext) {
    return this.invoiceService.createInvoice(createInvoiceDto, context);
  }
}