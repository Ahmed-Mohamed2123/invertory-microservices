import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { PaymentTransaction, PaymentTransactionSchema } from "./schemas/payment-transaction.schema";
import { PaymentTransactionRepository } from "./repositories/payment-transaction.repository";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: PaymentTransaction.name,
        schema: PaymentTransactionSchema
      }
    ])
  ],
  providers: [
    PaymentTransactionRepository,
    PaymentService
  ],
  controllers: [
    PaymentController
  ]
})
export class PaymentModule {
}