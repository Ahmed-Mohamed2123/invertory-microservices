import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { ObjectIdScalar } from "../../scallers/object-id.scalar";
import { JSONScalar } from "../../scallers/json.scalar";
import { PaymentService } from "./payment.service";
import { PaymentResolver } from "./payment.resolver";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: ClientName.PAYMENT,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("RMQ_URL")],
            queue: configService.get<string>("RMQ_PAYMENT_QUEUE")
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  providers: [
    ObjectIdScalar,
    JSONScalar,
    PaymentService,
    PaymentResolver
  ]
})
export class PaymentModule {}