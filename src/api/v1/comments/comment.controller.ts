import { Controller } from "@interfaces";
import { Router, Request, Response } from "express";
import constants from "@config/environment";
import { handleError, respondWithResult } from "@handlers";
import { CommentService } from "./comments.service";

class CommentController implements Controller {
  public path = `${constants.URI.v1}/comments`;
  public router = Router();

  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.post(this.path, this.addComment);
  }

  private addComment = async (req: Request, res: Response) => {
    try {
      const result = await CommentService.addComment(req.body, res.locals.user);
      return respondWithResult(req, res)(result);
    } catch (error) {
      return handleError(req, res)(error);
    }
  };
}

export default CommentController;
