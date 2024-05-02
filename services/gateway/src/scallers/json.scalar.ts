import { Scalar } from "@nestjs/graphql";
import { Kind } from "graphql";

@Scalar("JSON", () => JSON)
export class JSONScalar {
  description = "JSON custom scalar type";

  parseValue(value: any) {
    return JSON.parse(value); // value from the client input variables
  }

  serialize(value: any) {
    return JSON.stringify(value); // value sent to the client
  }

  parseLiteral(ast: any) {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value); // value from the client query
    }
    return null;
  }
}