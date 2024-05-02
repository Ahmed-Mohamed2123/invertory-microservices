import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class APICheckGuard implements CanActivate {
  constructor(private configService: ConfigService) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rpcContext = context.switchToRpc().getContext();
    const { properties: { headers } } = rpcContext.getMessage();
    if (!headers) return false;
    const xKeyHeader = headers["API_KEY"] ?? headers["api-key"];

    if (!xKeyHeader) return false;
    let api_key = this.configService.get("API_KEY");

    return api_key === xKeyHeader;
  }
}
