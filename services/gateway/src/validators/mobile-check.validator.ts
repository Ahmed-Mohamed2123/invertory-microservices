import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { isValidPhone } from "../helpers/mobile-number-validator.helper";

@ValidatorConstraint({ name: "mobileNumber", async: false })
export class IsValidMobile implements ValidatorConstraintInterface {
  validate(mobileNumber: string, args: ValidationArguments) {
    return mobileNumber ? isValidPhone(mobileNumber) : true;
  }

  defaultMessage(args: ValidationArguments) {
    return "Mobile ($value) is not valid!";
  }
}
