export interface ICommitFailedPaymentTransaction {
  paymentTransactionId: string;
  failedReason: Record<string, any>;
  paymentStatus: string;
  paymentType: string;
}