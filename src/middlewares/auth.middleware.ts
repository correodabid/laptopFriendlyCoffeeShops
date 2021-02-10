import { handleEntityNotFound, handleTokenError } from "@handlers";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { Collections } from "@interfaces";
import db from "@connection/database";
import { ObjectId } from "mongodb";
import { User } from "@schemes";

import constants from "@config/environment";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = async () => {
      if (!req.headers.authorization) {
        return handleTokenError(req, res)({ msg: "Token not found!" });
      }

      const token: any = req.headers.authorization?.replace("Bearer ", "");
      const decoded: any = jwt.verify(token, constants.secret);
      if (!decoded) {
        return handleTokenError(req, res)({ msg: "Invalid token!" });
      }

      const user: User = await db.findOne(
        Collections.users,
        { _id: new ObjectId(decoded.id), username: decoded.username },
        { createdAt: 0, updatedAt: 0 }
      );

      if (!user) {
        return handleEntityNotFound(req, res)({ msg: "No user found!" });
      }

      res.locals.user = user;

      next();
    };

    req.originalUrl.startsWith("/api/v1/auth") ? next() : validate();
  } catch (error) {
    return handleTokenError(
      req,
      res
    )({ msg: error.msg, code: "TokenErrorException" });
  }
};
