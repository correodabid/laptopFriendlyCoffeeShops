import { Joi } from "@utils";
import { ObjectId } from "mongodb";

export const coffeShopValidator = Joi.object({
  _id: Joi.objectId().optional(),
  name: Joi.string().required(),
  createdBy: Joi.objectId().required(),
  commentable: Joi.boolean().default(true),
});

export interface CoffeeShop {
  _id?: ObjectId | string;
  name: string;
  createdBy: ObjectId | string;
  commentable?: Boolean;
}
