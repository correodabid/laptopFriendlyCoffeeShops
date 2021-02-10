import { AuthService } from "@api/v1/auth/auth.service";
import { encrypt, compare } from "@utils";

import database from "@connection/database";

import jwt from "jsonwebtoken";

const fakeUser = {
  username: "admin",
  password: "1234",
};

describe("Auth Test", () => {
  const password: string = "1234";
  let hashedPassword: string;

  beforeAll(async () => database.openConnection());
  afterAll(async () => database.closeConnection());

  it("should return a hash from string", async () => {
    const result = await encrypt(password);
    hashedPassword = result;
    expect(result.startsWith("$")).toBeTruthy();
  });

  it("should compare string with encrypt", async () => {
    const result = await compare({ password: password, hash: hashedPassword });
    expect(result).toBeTruthy();
  });

  it("should return a jwtToken", async () => {
    const result = await AuthService.login(fakeUser);
    const decoded = jwt.decode(result!);
    expect(decoded).toHaveProperty("id");
    expect(decoded).toHaveProperty("username", fakeUser.username);
  });
});
