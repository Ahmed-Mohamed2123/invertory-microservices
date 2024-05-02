import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { LoginInput } from "./dtos/inputs/login.input";
import { LoginResponse } from "../../schemas/graphql";

@Injectable()
export class AuthService {
  constructor(@Inject(ClientName.AUTHENTICATION) private authenticationClient: ClientProxy,
              private configService: ConfigService) {
  }

  public async login(loginInput: LoginInput): Promise<LoginResponse> {
    const messagePayload = new RmqRecord(loginInput, {
      headers: {
        ['API-KEY']: this.configService.get("AUTH_API_KEY")
      },
      priority: 3,
    });

    const execution$ = this.authenticationClient.send("login", messagePayload);
    return lastValueFrom(execution$);
  }
}