import { Joi } from "@utils";
import { ObjectId } from "mongodb";

export enum UserTypes {
  admin = "admin",
  user = "user",
}

export const userValidator = Joi.object({
  _id: Joi.objectId().optional(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(UserTypes))
    .default(UserTypes.user)
    .required(),
});

export interface User {
  _id?: ObjectId | string;
  username: string;
  password: string;
  type: UserTypes;
}
