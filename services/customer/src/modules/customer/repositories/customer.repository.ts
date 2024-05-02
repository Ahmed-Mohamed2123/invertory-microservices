import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer, CustomerDocument } from "../schemas/customer.schema";
import { ICreateCustomer } from "../interfaces/create-customer.interface";

@Injectable()
export class CustomerRepository {
  constructor(@InjectModel(Customer.name) private model: Model<CustomerDocument>) {
  }

  public async getCustomer(email: string, mobileNumber: string): Promise<Customer> {
    return this.model.findOne({
      email,
      mobileNumber
    }).exec();
  }

  public async createCustomer(payload: ICreateCustomer): Promise<Customer> {
    return this.model.create(payload);
  }
}