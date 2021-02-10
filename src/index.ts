import "module-alias/register";
import App from "./app";

import AuthController from "@api/v1/auth/auth.controller";
import CoffeeShopController from "@api/v1/coffeShops/coffeeShop.controller";
import CommentController from "@api/v1/comments/comment.controller";
import UserController from "@api/v1/users/user.controller";

const app = new App([
  new AuthController(),
  new CoffeeShopController(),
  new CommentController(),
  new UserController(),
]);

app.listen();
