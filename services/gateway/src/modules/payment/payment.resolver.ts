import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { PaymentService } from "./payment.service";
import { CheckoutInput } from "./dtos/inputs/checkout.input";
import { UseGuards } from "@nestjs/common";
import { UserAuthGuard } from "../../guards/user-auth.guard";

@Resolver()
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => ({ success: Boolean }))
  checkout(@Args("checkoutInput") checkoutInput: CheckoutInput) {
    return this.paymentService.checkout(checkoutInput);
  }
}