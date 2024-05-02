import { Controller, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @MessagePattern("login")
  login(@Payload(ValidationPipe) loginDto: LoginDto,
        @Ctx() context: RmqContext) {
    return this.authService.login(loginDto, context);
  }
}