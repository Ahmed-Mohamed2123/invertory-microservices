import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Types } from "mongoose";

@ValidatorConstraint({ name: "_id", async: false })
export class IsValidObjectId implements ValidatorConstraintInterface {
  validate(_id: string, args: ValidationArguments) {
    return Types.ObjectId.isValid(_id);
  }

  defaultMessage(args: ValidationArguments) {
    return "_id ($value) is not valid object id!";
  }
}
