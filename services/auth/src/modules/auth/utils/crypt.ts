import * as argon from "argon2";

export class Crypt {
  public static verify(generated_argon2_hash, claim_text) {
    return new Promise((resolve) => {
      argon.verify(generated_argon2_hash, claim_text).then(match => {
        resolve(match);
      }).catch(_ => {
        console.log("hash error occurred");
        resolve(false);
      });
    });
  }
}
