import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "./schemas/customer.schema";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "./repositories/customer.repository";
import { CustomerController } from "./customer.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema
      }
    ])
  ],
  providers: [
    CustomerService,
    CustomerRepository
  ],
  controllers: [
    CustomerController
  ]
})
export class CustomerModule {
}