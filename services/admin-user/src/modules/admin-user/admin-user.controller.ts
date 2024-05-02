import { Controller, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { AdminUserService } from "./admin-user.service";
import { CreateSystemUserDto } from "./dtos/create-system-user.dto";
import { ObjectIdValidatorPipe } from "./pipes/object-id-validator.pipe";

@Controller("admin-user")
export class AdminUserController {
  constructor(private userService: AdminUserService) {
  }

  @MessagePattern("create-system-admin-user")
  createUser(@Payload(ValidationPipe) createSystemUserDto: CreateSystemUserDto,
             @Ctx() context: RmqContext) {
    return this.userService.createSystemUser(createSystemUserDto, context);
  }

  @MessagePattern("get-admin-user-by-id")
  getUserById(@Payload(ObjectIdValidatorPipe) userId: string,
              @Ctx() context: RmqContext) {
    return this.userService.getUserById(userId, context);
  }

  @MessagePattern("get-admin-user-credentials-by-username")
  getUserCredentialsByUsername(@Payload() username: string,
                               @Ctx() context: RmqContext) {

    return this.userService.getUserCredentialsByUsername(username, context);
  }
}