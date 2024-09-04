import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../../../scallers/object-id.scalar";

@ObjectType("AdminUser")
export class AdminUser {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => [String], {
    description: `A list of user's roles`
  })
  roles: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}