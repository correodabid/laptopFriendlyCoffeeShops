import { Joi } from "@utils";
import { ObjectId } from "mongodb";

export const commentValidator = Joi.object({
  _id: Joi.objectId().optional(),
  createdBy: Joi.objectId().optional(),
  title: Joi.string().required(),
  body: Joi.string().required(),
  coffeeShop: Joi.objectId().required(),
});

export interface Comment {
  _id?: ObjectId | string;
  createdBy: ObjectId | string;
  title: string;
  body: string;
  coffeeShop: ObjectId | string;
}
