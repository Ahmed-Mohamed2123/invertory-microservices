import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateSystemUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsArray()
  roles: string[];
}