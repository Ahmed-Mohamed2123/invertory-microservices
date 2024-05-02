import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./stratigies/jwt.strategy";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ClientName } from "../../enums/client-name.enum";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: "jwt"
    }),
    ClientsModule.registerAsync([
      {
        name: ClientName.AUTHENTICATION,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("RMQ_URL")],
            queue: configService.get<string>("RMQ_AUTHENTICATION_QUEUE")
          }
        }),
        inject: [ConfigService]
      },
      {
        name: ClientName.ADMIN_USER,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("RMQ_URL")],
            queue: configService.get<string>("RMQ_ADMIN_USER_QUEUE")
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  providers: [
    JwtStrategy,
    AuthService,
    AuthResolver
  ],
  exports: [
    PassportModule
  ]
})
export class AuthModule {
}