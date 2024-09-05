import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { ConfigService } from "@nestjs/config";
import {logger} from "../utils/winston";

@Injectable()
export class ServiceKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rpcContext = context.switchToRpc().getContext();
    const { properties: { headers } } = rpcContext.getMessage();
    if (!headers) return false;
    const serviceKeyHeader = headers["SERVICE_KEY"];

    if (!serviceKeyHeader) return false;
    let service_key = this.configService.get("SERVICE_KEY");

    return service_key === serviceKeyHeader;
  }
}
