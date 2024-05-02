import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdminUser, AdminUserDocument } from "../schemas/admin-user.schema";
import { _idConvertor } from "../utils/object-id-convertor";
import { ICreateSystemUser } from "../interfaces/create-system-user.interface";

@Injectable()
export class AdminUserRepository {
  constructor(@InjectModel(AdminUser.name) private model: Model<AdminUserDocument>) {
  }

  public async createUser(payload: ICreateSystemUser): Promise<AdminUser> {
    return this.model.create(payload);
  }

  public async getUserById(userId: string) {
    return this.model.findOne({ _id: _idConvertor(userId) }).exec();
  }

  public async getUserByUsername(username: string) {
    return this.model.findOne({ username }).exec();
  }

  public async getUserCredentialsByUsername(username: string) {
    return this.model.findOne({ username }, {
      username: 1,
      password: 1
    }).select("+password").exec();
  }
}