import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { concatMap, lastValueFrom, of, throwError } from "rxjs";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, RmqRecord } from "@nestjs/microservices";
import { ClientName } from "../../../enums/client-name.enum";
import { AdminUser } from "../../../schemas/graphql";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(@Inject(ClientName.ADMIN_USER) private adminUserClient: ClientProxy,
              private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_SECRET_KEY")
    });
  }

  async validate({ signature }: { signature: string }) {
    const messagePayload = new RmqRecord(signature, {
      headers: {
        ['API_KEY']: this.configService.get("USER_API_KEY")
      },
      priority: 3,
    });

    const userStream$ = this.adminUserClient.send("get-admin-admin-user-by-id", messagePayload);
    const execution$ = userStream$.pipe(
      concatMap((adminUser: AdminUser) => {
        if (!adminUser) {
          return throwError(() => new UnauthorizedException());
        }

        return of(adminUser);
      })
    );

    return lastValueFrom(execution$);
  }
}
