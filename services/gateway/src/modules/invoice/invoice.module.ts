import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { ObjectIdScalar } from "../../scallers/object-id.scalar";
import { InvoiceService } from "./invoice.service";
import { InvoiceResolver } from "./invoice.resolver";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: ClientName.INVOICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("RMQ_URL")],
            queue: configService.get<string>("RMQ_INVOICE_QUEUE")
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  providers: [
    ObjectIdScalar,
    InvoiceService,
    InvoiceResolver
  ]
})
export class InvoiceModule {
}