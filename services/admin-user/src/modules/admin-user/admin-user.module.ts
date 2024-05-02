import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminUser, AdminUserSchema } from "./schemas/admin-user.schema";
import { AdminUserService } from "./admin-user.service";
import { AdminUserController } from "./admin-user.controller";
import { AdminUserRepository } from "./repositories/admin-user.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AdminUser.name,
        schema: AdminUserSchema
      }
    ])
  ],
  providers: [
    AdminUserService,
    AdminUserRepository
  ],
  controllers: [
    AdminUserController
  ]
})
export class AdminUserModule {
}