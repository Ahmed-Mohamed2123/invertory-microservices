export interface ICreateInvoice {
  orderId: string;
  paymentTransactionId: string;
  customerId: string;
  totalAmount: number;
}