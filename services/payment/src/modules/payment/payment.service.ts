import { Injectable } from "@nestjs/common";
import { RmqContext } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { from, lastValueFrom, map, tap } from "rxjs";
import { _idDestructor } from "./utils/object-id-convertor";
import Stripe from "stripe";
import { PaymentTransactionRepository } from "./repositories/payment-transaction.repository";
import { confirmMessageProcessing } from "../../helpers/rabbitmq-message-confirmation";
import { CreateStripeCustomerDto } from "./dtos/create-stripe-customer.dto";
import { CreateStripeCustomerChargeDto } from "./dtos/create-stripe-customer-charge.dto";
import { InitiatePaymentTransactionDto } from "./dtos/initiate-payment-transaction.dto";
import { CommitSuccessfulPaymentTransactionDto } from "./dtos/commit-successful-payment-transaction.dto";
import { CommitFailedPaymentTransactionDto } from "./dtos/commit-failed-payment-transaction.dto";
import { ICommitFailedPaymentTransaction } from "./interfaces/commit-failed-payment-transaction.interface";
import { ICommitSuccessfulPaymentTransaction } from "./interfaces/commit-successful-payment-transaction.interface";
import { IInitiatePaymentTransaction } from "./interfaces/initiate-payment-transaction.interface";
import { PaymentTransaction } from "./schemas/payment-transaction.schema";

@Injectable()
export class PaymentService {
  private stripe;

  constructor(private paymentTransactionRepository: PaymentTransactionRepository,
              private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"));
  }

  public async createStripeCustomer(createStripeCustomerDto: CreateStripeCustomerDto,
                                    context: RmqContext): Promise<Stripe.Customer> {
    let stripeCustomer: Stripe.Customer;

    const stripeCustomerCreationStream$ = from(this.stripe.customers.create({
      ...createStripeCustomerDto
    })).pipe(
      tap((foundStripeCustomer: Stripe.Customer) => stripeCustomer = foundStripeCustomer)
    );

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = stripeCustomerCreationStream$.pipe(
      confirmMessageProcessingStream$(),
      map(() => stripeCustomer)
    );

    return lastValueFrom(execution$);
  }

  public async createStripeCustomerCharge(createStripeCustomerChargeDto: CreateStripeCustomerChargeDto,
                                          context: RmqContext): Promise<Stripe.Charge> {
    const { customer_id, total_price, source } = createStripeCustomerChargeDto;
    let stripeCustomerCharge: Stripe.Charge;

    const stripeCustomerChargeCreationStream$ = from(this.stripe.charges.create({
      customer: customer_id,
      source,
      amount: total_price,
      currency: "usd"
    })).pipe(
      tap((foundStripeCustomerCharge: Stripe.Charge) => stripeCustomerCharge = foundStripeCustomerCharge)
    );

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = stripeCustomerChargeCreationStream$.pipe(
      confirmMessageProcessingStream$(),
      map(() => stripeCustomerCharge)
    );

    return lastValueFrom(execution$);
  }

  public async initiatePaymentTransaction(initiatePaymentTransactionDto: InitiatePaymentTransactionDto,
                                          context: RmqContext) {
    const payload: IInitiatePaymentTransaction = initiatePaymentTransactionDto;
    let paymentTransactionId: string;

    const paymentTransactionInitiationStream$ = from(this.paymentTransactionRepository.initiatePaymentTransaction(payload)).pipe(
      tap((paymentTransaction: PaymentTransaction) => paymentTransactionId = _idDestructor(paymentTransaction._id))
    );

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = paymentTransactionInitiationStream$.pipe(
      confirmMessageProcessingStream$(),
      map(() => ({
        paymentTransactionId
      }))
    );

    return lastValueFrom(execution$);
  }

  public async commitSuccessfulPaymentTransaction(commitSuccessfulPaymentTransactionDto: CommitSuccessfulPaymentTransactionDto,
                                                  context: RmqContext) {
    const payload: ICommitSuccessfulPaymentTransaction = commitSuccessfulPaymentTransactionDto;

    const successfulPaymentTransactionCommitStream$ = from(this.paymentTransactionRepository.commitSuccessfulPaymentTransaction(payload));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = successfulPaymentTransactionCommitStream$.pipe(
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }

  public async commitFailedPaymentTransaction(commitFailedPaymentTransactionDto: CommitFailedPaymentTransactionDto,
                                              context: RmqContext) {
    const payload: ICommitFailedPaymentTransaction = commitFailedPaymentTransactionDto;

    const failedPaymentTransactionCommitStream$ = from(this.paymentTransactionRepository.commitFailedPaymentTransaction(payload));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = failedPaymentTransactionCommitStream$.pipe(
      confirmMessageProcessingStream$(),
      map(() => ({
        success: true
      }))
    );

    return lastValueFrom(execution$);
  }
}