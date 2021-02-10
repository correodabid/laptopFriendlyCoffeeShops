import { Comment, User, UserTypes } from "@schemes";
import { CommentService } from "@api/v1/comments/comments.service";
import database from "@connection/database";
import { ObjectId } from "mongodb";

const fakeAdminUser: User = {
  _id: new ObjectId("602249c48fe997bf396604af"),
  username: "admin",
  password: "$2b$10$/vQBWvI/2BfI9tzfUB7eCeKrFqebd53QjCP1olg7QvBAtYsc1Weau",
  type: UserTypes.admin,
};

const fakeCommomUser: User = {
  _id: new ObjectId("602249c48fe997bf396604af"),
  username: "user",
  password: "$2b$10$/vQBWvI/2BfI9tzfUB7eCeKrFqebd53QjCP1olg7QvBAtYsc1Weau",
  type: UserTypes.user,
};

const fakeComment: Comment = {
  title: "fake",
  body: "fake body",
  createdBy: "602249c48fe997bf396604af",
  coffeeShop: "60228cfdc51fb2cd52aa3e81",
};

describe("Comments Test", () => {
  beforeAll(async () => await database.openConnection());
  afterAll(async () => await database.closeConnection());

  it("should create a comment by Admin User", async () => {
    const result = await CommentService.addComment(fakeComment, fakeAdminUser);
    expect(result).toHaveProperty("createdBy");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");
    expect(result).toHaveProperty("body");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("coffeeShop");
  });

  it("should create a comment by Common User about commentable coffee shop", async () => {
    const result = await CommentService.addComment(
      { ...fakeComment, ...{ coffeeShop: "6023a893099880f4659be8c7" } },
      fakeCommomUser
    );
    expect(result).toHaveProperty("createdBy");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");
    expect(result).toHaveProperty("body");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("coffeeShop");
  });

  it("should create a comment by Common User about uncommentable coffee shop", async () => {
    try {
      await CommentService.addComment(fakeComment, fakeCommomUser);
    } catch (error) {
      expect(error).toHaveProperty(
        "message",
        "You don't have enougth permissions!"
      );
    }
  });
});
