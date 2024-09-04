import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminUser } from "./models/admin-user";
import { AdminUserService } from "./admin-user.service";
import { CreateSystemUserInput } from "./dtos/inputs/create-system-user.input";
import { UserAuthGuard } from "../../guards/user-auth.guard";
import { SuperAdminGuard } from "../../guards/super-admin.guard";

@Resolver(() => AdminUser)
@UseGuards(UserAuthGuard)
export class AdminUserResolver {
  constructor(private userService: AdminUserService) {
  }

  @UseGuards(SuperAdminGuard)
  @Mutation(() => AdminUser)
  createSystemUser(@Args("createSystemUserInput") createSystemUserInput: CreateSystemUserInput) {
    return this.userService.createSystemUser(createSystemUserInput);
  }
}