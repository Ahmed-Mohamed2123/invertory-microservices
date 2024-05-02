import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { User } from "./models/user";
import { UserService } from "./user.service";
import { CreateSystemUserInput } from "./dtos/inputs/create-system-user.input";
import { UserAuthGuard } from "../../guards/user-auth.guard";
import { SuperAdminGuard } from "../../guards/super-admin.guard";

@Resolver(() => User)
@UseGuards(UserAuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {
  }

  @UseGuards(SuperAdminGuard)
  @Mutation(() => User)
  createSystemUser(@Args("createSystemUserInput") createSystemUserInput: CreateSystemUserInput) {
    return this.userService.createSystemUser(createSystemUserInput);
  }
}