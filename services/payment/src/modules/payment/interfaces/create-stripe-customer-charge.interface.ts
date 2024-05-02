export interface CreateStripeCustomerChargeInterface {
  customer_id: string;
  total_price: number;
  source: string;
}