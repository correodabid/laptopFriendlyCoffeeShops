import { Controller } from "@interfaces";
import { Router, Request, Response } from "express";
import constants from "@config/environment";
import { handleError, respondWithResult } from "@handlers";
import { CoffeeShopService } from "./coffeeShop.service";

class CoffeeShopController implements Controller {
  public path = `${constants.URI.v1}/coffeeShops`;
  public router = Router();

  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.get(this.path, this.getCoffeeShops);
    this.router.get(`${this.path}/paginated`, this.getPaginatedCoffeeShops);

    this.router.post(this.path, this.createCoffeeShop);
  }

  private getCoffeeShops = async (req: Request, res: Response) => {
    try {
      const result = await CoffeeShopService.getCoffeeShops();
      return respondWithResult(req, res)(result);
    } catch (error) {
      return handleError(req, res)(error);
    }
  };

  private getPaginatedCoffeeShops = async (req: Request, res: Response) => {
    try {
      const result = await CoffeeShopService.getPaginatedCoffeeShops(
        {},
        req.query
      );
      return respondWithResult(req, res)(result);
    } catch (error) {
      return handleError(req, res)(error);
    }
  };

  private createCoffeeShop = async (req: Request, res: Response) => {
    try {
      const newCoffeShop = {
        ...req.body,
        ...{ createdBy: res.locals.user._id },
      };
      const result = await CoffeeShopService.createCoffeeShop(
        newCoffeShop
      ).catch((error) => {
        throw error;
      });
      return respondWithResult(req, res)(result);
    } catch (error) {
      return handleError(req, res)(error);
    }
  };
}

export default CoffeeShopController;
