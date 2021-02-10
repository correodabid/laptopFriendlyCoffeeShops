import { UserService } from "@api/v1/users/users.service";
import database from "@connection/database";
import { Collections } from "@interfaces";
import { User, UserTypes } from "@schemes";

const fakeUser: User = {
  username: "fake",
  password: "1234",
  type: UserTypes.user,
};

describe("Users Test", () => {
  beforeAll(async () => database.openConnection());
  afterAll(async () => {
    await database.deleteMany(Collections.users, {
      username: fakeUser.username,
    });
    database.closeConnection();
  });

  it("should create a user", async () => {
    const result = await UserService.createUser(fakeUser);
    expect(result).toHaveProperty("username", fakeUser.username);
    expect(result.password.startsWith("$")).toBeTruthy();
  });
});
