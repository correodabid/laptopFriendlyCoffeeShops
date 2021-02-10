import { Controller } from "@interfaces";
import { Router, Request, Response } from "express";
import constants from "@config/environment";
import { handleError, respondWithResult } from "@handlers";
import { UserService } from "./users.service";

class UserController implements Controller {
  public path = `${constants.URI.v1}/users`;
  public router = Router();

  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.post(this.path, this.createUser);
  }

  private createUser = async (req: Request, res: Response) => {
    try {
      const result = await UserService.createUser(req.body);
      return respondWithResult(req, res)(result);
    } catch (error) {
      return handleError(req, res)(error);
    }
  };
}

export default UserController;
