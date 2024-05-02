import { Injectable } from "@nestjs/common";
import { from, lastValueFrom, tap } from "rxjs";
import { RmqContext } from "@nestjs/microservices";
import { InvoiceRepository } from "./repositories/Invoice.repository";
import { CreateInvoiceDto } from "./dtos/create-invoice.dto";
import { ICreateInvoice } from "./interfaces/create-invoice.interface";
import { IGetCustomerInvoice } from "./interfaces/get-customer-invoice.interface";
import { GetCustomerInvoiceDto } from "./dtos/get-customer-invoice.dto";
import { confirmMessageProcessing } from "../../helpers/rabbitmq-message-confirmation";

@Injectable()
export class InvoiceService {
  constructor(private invoiceRepository: InvoiceRepository) {
  }

  public async getCustomerInvoicesCount(customerId: string,
                                        context: RmqContext) {

    const customerInvoicesCountStream$ = from(this.invoiceRepository.getCustomerInvoicesCount(customerId));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = customerInvoicesCountStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async getCustomerInvoices(getCustomerInvoices: GetCustomerInvoiceDto,
                                   context: RmqContext) {
    const payload: IGetCustomerInvoice = getCustomerInvoices;
    const customerInvoicesStream$ = from(this.invoiceRepository.getCustomerInvoices(payload));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = customerInvoicesStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }


  public async createInvoice(createInvoiceDto: CreateInvoiceDto,
                             context: RmqContext) {

    const payload: ICreateInvoice = createInvoiceDto;
    const customerInvoiceCreationStream$ = from(this.invoiceRepository.createInvoice(payload));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = customerInvoiceCreationStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }
}