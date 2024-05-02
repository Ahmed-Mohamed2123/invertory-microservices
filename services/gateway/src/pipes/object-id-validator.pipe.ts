import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class ObjectIdValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidObjectId(value)) {
      throw new BadRequestException(`Invalid ${metadata.data} provided`);
    }
    return value;
  }

  private isValidObjectId(value: string): boolean {
    return Types.ObjectId.isValid(value);
  }
}