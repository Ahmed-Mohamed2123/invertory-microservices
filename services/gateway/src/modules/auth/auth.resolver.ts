import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dtos/inputs/login.input";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Mutation(() => ({token: String}))
  login(@Args("loginInput") loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}