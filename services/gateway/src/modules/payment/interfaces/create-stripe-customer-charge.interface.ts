export interface ICreateStripeCustomerCharge {
  customer_id: string;
  total_price: number;
  source: string;
}