import { Inject, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { RmqRecordOptions } from "@nestjs/microservices/record-builders/rmq.record-builder";
import { ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { GetCustomerInvoiceArgs } from "./dtos/args/get-customer.invoice.args";
import { CreateInvoiceInput } from "./dtos/inputs/create-invoice.input";

@Injectable()
export class InvoiceService {
  private readonly rmqRecordOptions: RmqRecordOptions;

  constructor(@Inject(ClientName.INVOICE) private invoiceService: ClientProxy,
              private configService: ConfigService) {
    this.rmqRecordOptions = {
      headers: {
        ['SERVICE-KEY']: this.configService.get("INVOICE_SERVICE_KEY")
      },
      priority: 3,
    }
  }

  public async getCustomerInvoices(getCustomerInvoiceArgs: GetCustomerInvoiceArgs) {
    const messagePayload = new RmqRecord(getCustomerInvoiceArgs, this.rmqRecordOptions);

    const execution$ = this.invoiceService.send("get-customer-invoices", messagePayload);
    return lastValueFrom(execution$);
  }

  public async getCustomerInvoicesCount(customerId: string) {
    const messagePayload = new RmqRecord(customerId, this.rmqRecordOptions);

    const execution$ = this.invoiceService.send("get-customer-invoices-count", messagePayload);
    return lastValueFrom(execution$);
  }

  public async createInvoice(createInvoiceInput: CreateInvoiceInput) {
    const messagePayload = new RmqRecord(createInvoiceInput, this.rmqRecordOptions);

    const execution$ = this.invoiceService.send("create-invoice", messagePayload);
    return lastValueFrom(execution$);
  }
}