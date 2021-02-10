import jwt from "jsonwebtoken";
import database from "@connection/database";
import { Collections } from "@interfaces";
import { compare } from "@utils";
import { User } from "@schemes";
import constants from "@config/environment";

export namespace AuthService {
  export const login = async (authData: {
    username: string;
    password: string;
  }) => {
    try {
      const user: User = await database.findOne(Collections.users, {
        username: authData.username,
      });
      if (!user) throw { message: "Not valid username or password!" };
      const validPassword = await compare({
        password: authData.password,
        hash: user.password,
      });
      if (!validPassword) throw { message: "Not valid username or password!" };
      const token = jwt.sign(
        { id: user._id, username: user.username },
        constants.secret
      );
      return token;
    } catch (error) {
      throw error;
    }
  };
}
