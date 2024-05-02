import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { Types } from "mongoose";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ObjectIdValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!Types.ObjectId.isValid(value)) {
      throw new RpcException("Invalid ObjectId");
    }

    return value;
  }
}