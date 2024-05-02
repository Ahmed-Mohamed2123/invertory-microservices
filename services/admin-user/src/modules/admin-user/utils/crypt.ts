import * as argon from "argon2";

export class Crypt {
  public static async encrypt(text) {
    return new Promise((resolve, reject) => {
      argon.hash(text)
        .then((salt) => {
          resolve(salt);
        }).catch(err => reject(err));
    });
  }
}
