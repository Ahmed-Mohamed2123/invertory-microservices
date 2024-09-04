import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { RoleType } from "../modules/admin-user/enums/role-type.enum";

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    const isNotSuperAdmin = user.roles.indexOf(RoleType.SUPER_ADMIN) === -1;

    return !isNotSuperAdmin;
  }
}