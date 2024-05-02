export interface IInitiatePaymentTransaction {
  customerId: string;
  orderId: string;
  customerDetails: Record<string, any>;
}