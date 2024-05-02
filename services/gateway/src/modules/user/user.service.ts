import { Inject, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { ClientName } from "../../enums/client-name.enum";
import { CreateSystemUserInput } from "./dtos/inputs/create-system-user.input";
import { User } from "../../schemas/graphql";
import { RmqRecordOptions } from "@nestjs/microservices/record-builders/rmq.record-builder";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  private readonly rmqRecordOptions: RmqRecordOptions;

  constructor(@Inject(ClientName.ADMIN_USER) private userClient: ClientProxy,
              private configService: ConfigService) {
    this.rmqRecordOptions = {
      headers: {
        ["API_KEY"]: this.configService.get("ADMIN_USER_API_KEY")
      },
      priority: 3
    };
  }

  public async createSystemUser(createSystemUserInput: CreateSystemUserInput): Promise<User> {
    const messagePayload = new RmqRecord(createSystemUserInput, this.rmqRecordOptions);

    const execution$ = this.userClient.send("create-system-admin-user", messagePayload);
    return lastValueFrom(execution$);
  }
}