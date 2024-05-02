import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaymentTransaction, PaymentTransactionDocument } from "../schemas/payment-transaction.schema";
import { TransactionStatus } from "../enums/transaction-status.enum";
import { _idConvertor } from "../utils/object-id-convertor";
import { IInitiatePaymentTransaction } from "../interfaces/initiate-payment-transaction.interface";
import { ICommitSuccessfulPaymentTransaction } from "../interfaces/commit-successful-payment-transaction.interface";
import { ICommitFailedPaymentTransaction } from "../interfaces/commit-failed-payment-transaction.interface";

@Injectable()
export class PaymentTransactionRepository {
  constructor(@InjectModel(PaymentTransaction.name) private model: Model<PaymentTransactionDocument>) {
  }

  public async initiatePaymentTransaction(payload: IInitiatePaymentTransaction) {
    return this.model.create({
      ...payload,
      transactionStatus: TransactionStatus.PENDING
    });
  }

  public async commitSuccessfulPaymentTransaction(payload: ICommitSuccessfulPaymentTransaction) {
    const { paymentTransactionId } = payload;
    return this.model.updateOne({ _id: _idConvertor(paymentTransactionId) }, {
      $set: {
        ...payload,
        transactionStatus: TransactionStatus.SUCCESS
      }
    }).exec();
  }

  public async commitFailedPaymentTransaction(payload: ICommitFailedPaymentTransaction) {
    const { paymentTransactionId } = payload;
    return this.model.updateOne({ _id: _idConvertor(paymentTransactionId) }, {
      $set: {
        ...payload,
        transactionStatus: TransactionStatus.FAILED
      }
    }).exec();
  }
}