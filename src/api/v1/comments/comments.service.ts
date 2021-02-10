import { CoffeeShop, Comment, commentValidator, User } from "@schemes";
import database from "@connection/database";
import { Collections } from "@interfaces";

export namespace CommentService {
  export const addComment = async (comment: Comment, user: User) => {
    try {
      const validComment = await commentValidator.validate(comment);
      if (validComment.error) throw validComment.error;

      if (user.type === "admin") {
        return await database.create(Collections.comments, {
          ...validComment.value,
          ...{ createdBy: user._id },
        });
      } else {
        const coffeeShop: CoffeeShop | null = await database.findOne(
          Collections.coffeeShops,
          { _id: validComment.value.coffeeShop }
        );

        if (!coffeeShop || coffeeShop.commentable === false) {
          throw { message: "You don't have enougth permissions!" };
        }

        return await database.create(Collections.comments, {
          ...validComment.value,
          ...{ createdBy: user._id },
        });
      }
    } catch (error) {
      throw error;
    }
  };
}
