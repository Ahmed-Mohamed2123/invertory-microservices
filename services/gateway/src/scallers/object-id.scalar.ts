import { Scalar } from "@nestjs/graphql";
import { Kind, ASTNode } from "graphql";
import { Types } from "mongoose";

@Scalar("ObjectId")
export class ObjectIdScalar {
  description = "MongoDB ObjectId scalar type, sent as 24 byte Hex String";

  parseValue(value: string) {
    if (!this.isValidObjectId(value)) {
      this.throwInvalidObjectIdError(value);
    }
    return new Types.ObjectId(value);
  }

  serialize(value: Types.ObjectId) {
    return this.convertObjectIdToHexString(value);
  }

  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.STRING) {
      const { value } = ast;
      if (!this.isValidObjectId(value)) {
        this.throwInvalidObjectIdError(value);
      }

      return new Types.ObjectId(value);
    }

    throw new Error("Invalid ObjectId AST type");
  }

  private convertObjectIdToHexString(objectId: Types.ObjectId) {
    return objectId.toString("hex");
  }

  private isValidObjectId(value: string): boolean {
    return Types.ObjectId.isValid(value);
  }

  private throwInvalidObjectIdError(value: string) {
    throw new Error(`Invalid ObjectId value: ${value}`);
  }
}
