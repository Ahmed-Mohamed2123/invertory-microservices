import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Invoice, InvoiceSchema } from "./schemas/invoice.schema";
import { InvoiceRepository } from "./repositories/Invoice.repository";
import { InvoiceService } from "./invoice.service";
import { InvoiceController } from "./invoice.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Invoice.name,
        schema: InvoiceSchema
      }
    ])
  ],
  providers: [
    InvoiceRepository,
    InvoiceService
  ],
  controllers: [
    InvoiceController
  ]
})
export class InvoiceModule {
}