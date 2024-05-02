import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateSystemUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @IsArray()
  @Field(() => [String])
  roles: string[];
}