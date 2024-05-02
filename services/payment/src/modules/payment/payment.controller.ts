import { Controller, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { PaymentService } from "./payment.service";
import { CreateStripeCustomerDto } from "./dtos/create-stripe-customer.dto";
import { CreateStripeCustomerChargeDto } from "./dtos/create-stripe-customer-charge.dto";
import { InitiatePaymentTransactionDto } from "./dtos/initiate-payment-transaction.dto";
import { CommitSuccessfulPaymentTransactionDto } from "./dtos/commit-successful-payment-transaction.dto";
import { CommitFailedPaymentTransactionDto } from "./dtos/commit-failed-payment-transaction.dto";

@Controller("payment")
export class PaymentController {
  constructor(private paymentService: PaymentService) {
  }

  @MessagePattern("create-stripe-customer")
  createStripeCustomer(@Payload(ValidationPipe) createStripeCustomerDto: CreateStripeCustomerDto,
                       @Ctx() context: RmqContext) {
    return this.paymentService.createStripeCustomer(createStripeCustomerDto, context);
  }

  @MessagePattern("create-stripe-customer-charge")
  createStripeCustomerCharge(@Payload(ValidationPipe) createStripeCustomerChargeDto: CreateStripeCustomerChargeDto,
                             @Ctx() context: RmqContext) {
    return this.paymentService.createStripeCustomerCharge(createStripeCustomerChargeDto, context);
  }

  @MessagePattern("initiate-payment-transaction")
  initiatePaymentTransaction(@Payload(ValidationPipe) initiatePaymentTransactionDto: InitiatePaymentTransactionDto,
                             @Ctx() context: RmqContext) {
    return this.paymentService.initiatePaymentTransaction(initiatePaymentTransactionDto, context);
  }

  @MessagePattern("commit-successful-payment-transaction")
  commitSuccessfulPaymentTransaction(@Payload(ValidationPipe) commitSuccessfulPaymentTransactionDto: CommitSuccessfulPaymentTransactionDto,
                                     @Ctx() context: RmqContext) {
    return this.paymentService.commitSuccessfulPaymentTransaction(commitSuccessfulPaymentTransactionDto, context);
  }

  @MessagePattern("commit-failed-payment-transaction")
  commitFailedPaymentTransaction(@Payload(ValidationPipe) commitFailedPaymentTransactionDto: CommitFailedPaymentTransactionDto,
                                 @Ctx() context: RmqContext) {
    return this.paymentService.commitFailedPaymentTransaction(commitFailedPaymentTransactionDto, context);
  }
}