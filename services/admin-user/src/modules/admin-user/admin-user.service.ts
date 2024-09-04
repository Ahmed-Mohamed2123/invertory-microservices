import { Injectable } from "@nestjs/common";
import { AdminUserRepository } from "./repositories/admin-user.repository";
import { concatMap, from, lastValueFrom, of, tap, throwError } from "rxjs";
import { RmqContext, RpcException } from "@nestjs/microservices";
import { AdminUser } from "./schemas/admin-user.schema";
import { Crypt } from "./utils/crypt";
import { CreateSystemUserDto } from "./dtos/create-system-user.dto";
import { confirmMessageProcessing } from "../../helpers/rabbitmq-message-confirmation";
import { ICreateSystemUser } from "./interfaces/create-system-user.interface";

@Injectable()
export class AdminUserService {
  constructor(private adminUserRepository: AdminUserRepository) {
  }

  public async createSystemUser(createSystemUserDto: CreateSystemUserDto, context: RmqContext) {
    const { username, password, roles } = createSystemUserDto;
    let hashedPassword: string;

    const userLookupStream$ = from(this.adminUserRepository.getUserByUsername(username)).pipe(
      concatMap((foundUser: AdminUser) =>
        foundUser ? throwError(() => new RpcException("AdminUser already exists!!!")) : of(null)
      )
    );

    const encryptPasswordStream$ = () => concatMap(() => from(Crypt.encrypt(password)).pipe(
      tap((foundHashedPassword: string) => hashedPassword = foundHashedPassword)
    ));

    const createUserStream$ = () => concatMap(() => {
      const payload: ICreateSystemUser = {
        username,
        password: hashedPassword,
        roles
      };

      return from(this.adminUserRepository.createUser(payload));
    });

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = userLookupStream$.pipe(
      encryptPasswordStream$(),
      createUserStream$(),
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async getUserById(userId: string,
                           context: RmqContext) {
    const userLookupStream$ = from(this.adminUserRepository.getUserById(userId)).pipe(
      concatMap((user: AdminUser) =>
        user ?
          of(user) : throwError(() => new RpcException("This AdminUser does not found!!!")))
    );

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = userLookupStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }

  public async getUserCredentialsByUsername(username: string,
                                            context: RmqContext) {
    const userLookupStream$ = from(this.adminUserRepository.getUserCredentialsByUsername(username)).pipe(
      concatMap((user: AdminUser) =>
        user ?
          of(user) : throwError(() => new RpcException("This AdminUser does not found!!!")))
    );

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = userLookupStream$.pipe(
      confirmMessageProcessingStream$()
    );

    return lastValueFrom(execution$);
  }
}