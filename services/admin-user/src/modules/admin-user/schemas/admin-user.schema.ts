import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { RoleType } from "../enums/role-type.enum";

export type AdminUserDocument = AdminUser & Document;

@Schema({
  timestamps: true,
  collection: "admins-users"
})
export class AdminUser extends Document {
  @Prop({
    type: String,
    unique: true,
    required: true
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    select: false
  })
  password: string;

  @Prop({
    type: Array,
    required: true,
    enum: RoleType
  })
  roles: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
