import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { ClientName } from "../../enums/client-name.enum";
import { LoginInput } from "./dtos/inputs/login.input";
import { LoginResponse } from "../../schemas/graphql";
import {logger} from "../../utils/winston";

@Injectable()
export class AuthService {
  constructor(@Inject(ClientName.AUTHENTICATION) private authenticationClient: ClientProxy,
              private configService: ConfigService) {
  }

  public async login(loginInput: LoginInput): Promise<LoginResponse> {
    const messagePayload = new RmqRecord(loginInput, {
      headers: {
        ['SERVICE_KEY']: this.configService.get("AUTH_SERVICE_KEY")
      },
      priority: 3,
    });
    logger.logMessage({
      title: "login message payload: ",
      data: messagePayload
    })
    const execution$ = this.authenticationClient.send("login", messagePayload);
    return lastValueFrom(execution$);
  }
}