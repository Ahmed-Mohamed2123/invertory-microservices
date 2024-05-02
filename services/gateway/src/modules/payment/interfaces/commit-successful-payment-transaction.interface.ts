export interface ICommitSuccessfulPaymentTransaction {
  paymentTransactionId: string;
  paymentDetails: Record<string, any>;
  paymentStatus: string;
  paymentType: string;
}