import joi from "joi";
import { ObjectId } from "mongodb";

const joiObjectId: any = (Joi: any) => ({
  type: "objectId",
  base: Joi.any(),
  messages: {
    objectId: "needs to be a valid ObjectId",
  },
  coerce(value: string | ObjectId | undefined) {
    if (!value) return;

    if (typeof value === "string" && value.match(/^[0-9a-fA-F]{24}$/)) {
      value = new ObjectId(value);
    }

    return { value };
  },
  validate(value: any, helpers: { error: (arg0: string) => any }) {
    if (!(value instanceof ObjectId)) {
      const errors = helpers.error("objectId");
      return { value, errors };
    }
    return { value };
  },
});

export const Joi = joi.extend(joiObjectId);
