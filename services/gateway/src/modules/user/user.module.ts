import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ClientName } from "../../enums/client-name.enum";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ObjectIdScalar } from "../../scallers/object-id.scalar";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
        {
          name: ClientName.ADMIN_USER,
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('RMQ_URL')],
              queue: configService.get<string>('RMQ_ADMIN_USER_QUEUE'),
            },
          }),
          inject: [ConfigService],
        },
    ]),
  ],
  providers: [
    UserService,
    UserResolver,
    ObjectIdScalar
  ]
})
export class UserModule {
}