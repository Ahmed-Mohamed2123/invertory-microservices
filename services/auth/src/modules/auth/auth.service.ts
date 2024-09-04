import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RmqContext, RmqRecord, RpcException } from "@nestjs/microservices";
import { concatMap, from, lastValueFrom, map, of, tap, throwError } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Crypt } from "./utils/crypt";
import { LoginDto } from "./dtos/login.dto";
import { IUser } from "./interfaces/user.interface";
import { _idDestructor } from "./utils/object-id-convertor";
import { confirmMessageProcessing } from "../../helpers/rabbitmq-message-confirmation";
import { ClientName } from "../../enums/client-name.enum";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService,
              @Inject(ClientName.ADMIN_USER) private userClient: ClientProxy,
              private configService: ConfigService) {
  }

  public async login(loginDto: LoginDto, context: RmqContext) {
    const { username, password } = loginDto;
    let userData: IUser;

    const messagePayload = new RmqRecord(username,  {
      headers: {
        ["API-KEY"]: this.configService.get("ADMIN_USER_API_KEY")
      },
      priority: 3
    });

    const userStream$ = this.userClient.send("get-admin-admin-user-credentials-by-username", messagePayload).pipe(
      tap((foundUser: IUser) => userData = foundUser)
    );

    const validatePasswordStream$ = () => concatMap(() => from(Crypt.verify(userData.password, password)).pipe(
      concatMap((match: boolean) => {
        if (!match) {
          return throwError(() => new RpcException("Invalid password, Please try again"));
        }

        return of(null);
      })
    ));

    const confirmMessageProcessingStream$ = () => tap(() => confirmMessageProcessing(context));

    const execution$ = userStream$.pipe(
      validatePasswordStream$(),
      confirmMessageProcessingStream$(),
      map(() => ({
        token: this.jwtService.sign({ signature: _idDestructor(userData._id) })
      }))
    );

    return lastValueFrom(execution$);
  }
}