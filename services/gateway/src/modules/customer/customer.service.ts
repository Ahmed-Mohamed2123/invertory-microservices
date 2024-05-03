import { Inject, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { CreateCustomerInput } from "./dtos/inputs/create-customer.input";
import { Customer } from "../../schemas/graphql";

@Injectable()
export class CustomerService {
  constructor(@Inject(ClientName.CUSTOMER) private customerClient: ClientProxy,
              private configService: ConfigService) {
  }

  public async createCustomer(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    const messagePayload = new RmqRecord(createCustomerInput, {
      headers: {
        ['SERVICE-KEY']: this.configService.get("CUSTOMER_SERVICE_KEY")
      },
      priority: 3,
    });

    const execution$ = this.customerClient.send("create-customer", messagePayload);
    return lastValueFrom(execution$);
  }
}