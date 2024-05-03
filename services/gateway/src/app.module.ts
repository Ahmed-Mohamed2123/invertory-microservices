import { Module } from "@nestjs/common";
import { join } from "path";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { InventoryModule } from "./modules/inventory/inventory.module";
import { OrderModule } from "./modules/order/order.module";
import { ShipmentModule } from "./modules/shipping/shipment.module";
import { InvoiceModule } from "./modules/invoice/invoice.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { SecretKeyGuard } from "./guards/secret-key.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV || "local"}.env`
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.gql"],
      definitions: {
        path: join(process.cwd(), "src/schemas/graphql.d.ts"),
        outputAs: "class"
      },
      context: ({ req }) => ({ req })
    }),
    UserModule,
    AuthModule,
    CustomerModule,
    InventoryModule,
    OrderModule,
    ShipmentModule,
    InvoiceModule,
    PaymentModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SecretKeyGuard
    }
  ]
})
export class AppModule {
}
