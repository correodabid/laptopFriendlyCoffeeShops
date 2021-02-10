import { User, userValidator } from "@schemes";

import database from "@connection/database";
import { Collections } from "@interfaces";
import { encrypt } from "@utils";

export namespace UserService {
  export const createUser = async (user: User) => {
    try {
      const validUser = userValidator.validate(user);
      if (validUser.error) throw validUser.error;
      const password = await encrypt(user.password);
      const result = await database.create(Collections.users, {
        ...validUser.value,
        password,
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}
