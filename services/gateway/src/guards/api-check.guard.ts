import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";
import {ConfigService} from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class APICheckGuard implements CanActivate {
    constructor(private configService: ConfigService) {
    }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        const xKeyHeader = req.headers["API-KEY"] ?? req.headers["api-key"];

        if (!xKeyHeader) return false;
        let api_key = this.configService.get("API_KEY");
        return api_key === xKeyHeader;
    }
}
