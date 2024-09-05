import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import {logger} from "../utils/winston";

@Injectable()
export class SecretKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const secretKeyHeader = req.headers["secret-key"];

    if (!secretKeyHeader) return false;

    let secret_key = this.configService.get("SECRET_KEY");
    return secret_key === secretKeyHeader;
  }
}
