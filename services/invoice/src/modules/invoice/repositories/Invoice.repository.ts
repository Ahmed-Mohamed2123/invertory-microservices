import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Invoice, InvoiceDocument } from "../schemas/invoice.schema";
import { IGetCustomerInvoice } from "../interfaces/get-customer-invoice.interface";
import { ICreateInvoice } from "../interfaces/create-invoice.interface";

@Injectable()
export class InvoiceRepository {
  constructor(@InjectModel(Invoice.name) private model: Model<InvoiceDocument>) {
  }

  public async getCustomerInvoices(payload: IGetCustomerInvoice): Promise<Invoice[]> {
    const { limit, customerId } = payload;
    return this.model.find({
      customerId
    }).limit(limit).exec();
  }

  public async getCustomerInvoicesCount(customerId: string): Promise<number> {
    return this.model.countDocuments({
      customerId
    }).exec();
  }

  public async createInvoice(payload: ICreateInvoice) {
    return this.model.create(payload);
  }
}