import { Controller } from "@interfaces";
import { Router, Request, Response } from "express";
import constants from "@config/environment";
import { handleForbiddenAction, respondWithResult } from "@handlers";
import { AuthService } from "./auth.service";

class AuthController implements Controller {
  public path = `${constants.URI.v1}/auth`;
  public router = Router();

  constructor() {
    this.initializeControllers();
  }

  private initializeControllers() {
    this.router.post(this.path, this.login);
  }

  private login = async (req: Request, res: Response) => {
    try {
      const result = await AuthService.login(req.body);
      return respondWithResult(req, res)(result);
    } catch (error) {
      return handleForbiddenAction(req, res)({ msg: error.message });
    }
  };
}

export default AuthController;
