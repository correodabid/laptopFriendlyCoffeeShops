import express from "express";
import morgan from "morgan";
import { Controller } from "@interfaces";
import constants from "@config/environment";

import { authentication } from "@middlewares";

import seedDB from "@config/seeds/seed";

class App {
  public app: express.Application;
  public port = constants.port;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.seedDatabase();
  }

  public listen() {
    return this.app.listen(this.port, () =>
      console.log(
        `App listenint on port ${constants.port} in ${constants.env} mode`
      )
    );
  }

  private initializeMiddleware() {
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(authentication);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => this.app.use("/", controller.router));
  }

  private seedDatabase() {
    if (constants.env === "development" && constants.seedDB === true) seedDB();
  }
}

export default App;
