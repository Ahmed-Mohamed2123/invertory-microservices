import { Injectable } from "@nestjs/common";
import { concatMap, from, lastValueFrom, of, tap, throwError } from "rxjs";
import { RmqContext, RpcException } from "@nestjs/microservices";
import { CustomerRepository } from "./repositories/customer.repository";
import { Customer } from "./schemas/customer.schema";
import { confirmMessageProcessing } from "../../helpers/rabbitmq-message-confirmation";
import { CreateCustomerDto } from "./dtos/create-customer.dto";
import { ICreateCustomer } from "./interfaces/create-customer.interface";

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {
  }

  public async createCustomer(createCustomerDto: CreateCustomerDto, context: RmqContext) {
    const { email, mobileNumber } = createCustomerDto;
    const customerLookupStream$ = from(this.customerRepository.getCustomer(email, mobileNumber)).pipe(
      concatMap((customer: Customer) =>
        customer ?
          throwError(() => new RpcException("This customer already exists!!!")) : of(customer)
      )
    );

    const createCustomerStream$ = () => concatMap(() => {
      const payload: ICreateCustomer = createCustomerDto;
      return from(this.customerRepository.createCustomer(payload));
    });

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = customerLookupStream$.pipe(
      createCustomerStream$(),
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }
}