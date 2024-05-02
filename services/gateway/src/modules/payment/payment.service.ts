import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { CheckoutInput } from "./dtos/inputs/checkout.input";
import Stripe from "stripe";
import { concatMap, lastValueFrom, map, of, tap } from "rxjs";
import { IInitiatePaymentTransaction } from "./interfaces/initiate-payment-transaction.interface";
import { ICreateStripeCustomerCharge } from "./interfaces/create-stripe-customer-charge.interface";
import { ICommitSuccessfulPaymentTransaction } from "./interfaces/commit-successful-payment-transaction.interface";
import { PaymentStatus } from "./enums/payment-status.enum";
import { ICommitFailedPaymentTransaction } from "./interfaces/commit-failed-payment-transaction.interface";
import { RmqRecordOptions } from "@nestjs/microservices/record-builders/rmq.record-builder";

@Injectable()
export class PaymentService {
  private readonly rmqRecordOptions: RmqRecordOptions;

  constructor(@Inject(ClientName.PAYMENT) private paymentClient: ClientProxy,
              private configService: ConfigService,) {
    this.rmqRecordOptions = {
      headers: {
        ["API-KEY"]: this.configService.get("PAYMENT_API_KEY")
      },
      priority: 3
    };
  }

  public async checkout(checkoutInput: CheckoutInput) {
    const {orderId, customerId, name, source, email, total_price} = checkoutInput;
    let stripeCustomer: Stripe.Customer;
    let stripeCharge: Stripe.Charge;
    let paymentTransactionId: string;

    const stripeCustomerCreationPayload = new RmqRecord({email, name, source}, this.rmqRecordOptions);

    const stripeCustomerCreationStream$ = this.paymentClient.send("create-stripe-customer", stripeCustomerCreationPayload).pipe(
      tap((foundStripeCustomer: Stripe.Customer) => stripeCustomer = foundStripeCustomer)
    );

    const initiatePaymentTransactionStream$ = () => concatMap(() => {
      const data: IInitiatePaymentTransaction = {
        customerDetails: stripeCustomer,
        customerId,
        orderId,
      }

      const messagePayload = new RmqRecord(data, this.rmqRecordOptions);

      return this.paymentClient.send("initiate-payment-transaction", messagePayload).pipe(
        tap((result: {paymentTransactionId: string}) => paymentTransactionId = result.paymentTransactionId)
      );
    });

    const createStripeCustomerChargeStream$ = () => concatMap(() => {
      const data: ICreateStripeCustomerCharge = {
        customer_id: stripeCustomer.id,
        source,
        total_price
      }

      const messagePayload = new RmqRecord(data, this.rmqRecordOptions);

      return this.paymentClient.send("create-stripe-customer-charge", messagePayload).pipe(
        tap((foundStripeCustomerCharge: Stripe.Charge) => stripeCharge = foundStripeCustomerCharge)
      );
    })

    const commitSuccessfulPaymentTransactionStream$ = () => concatMap(() => {
      const data: ICommitSuccessfulPaymentTransaction = {
        paymentTransactionId,
        paymentStatus: PaymentStatus.ACTIVE,
        paymentType: stripeCharge.payment_method_details.type,
        paymentDetails: stripeCharge
      }

      const messagePayload = new RmqRecord(data, this.rmqRecordOptions);

      return this.paymentClient.send("commit-successful-payment-transaction", messagePayload);
    });

    const commitFailedPaymentTransactionStream$ = () => concatMap(() => {
      const data: ICommitFailedPaymentTransaction = {
        paymentTransactionId,
        paymentStatus: PaymentStatus.INACTIVE,
        paymentType: stripeCharge.payment_method_details.type,
        failedReason: stripeCharge
      }

      const messagePayload = new RmqRecord(data, this.rmqRecordOptions);

      return this.paymentClient.send("commit-failed-payment-transaction", messagePayload);
    });

    const execution$ = stripeCustomerCreationStream$.pipe(
      initiatePaymentTransactionStream$(),
      createStripeCustomerChargeStream$(),
      concatMap(() => {
        const {status} = stripeCharge;
        if (status === "succeeded") {
          return of({}).pipe(
            commitSuccessfulPaymentTransactionStream$(),
            map(() => ({
              success: true
            }))
          );
        }

        return of({}).pipe(
          commitFailedPaymentTransactionStream$(),
          map(() => ({
            success: false
          }))
        );
      })
    );

    return lastValueFrom(execution$);
  }
}