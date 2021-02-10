import request from "supertest";
import express from "express";
import database from "@connection/database";

import AuthController from "@api/v1/auth/auth.controller";
import CoffeeShopController from "@api/v1/coffeShops/coffeeShop.controller";
import CommentController from "@api/v1/comments/comment.controller";
import UserController from "@api/v1/users/user.controller";
import { Collections, Controller } from "@interfaces";

import { authentication } from "@middlewares";
import { UserTypes } from "@schemes";

const app = express();

const controllers: Controller[] = [
  new AuthController(),
  new CoffeeShopController(),
  new CommentController(),
  new UserController(),
];

app.use(authentication);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
controllers.forEach((controller) => app.use("/", controller.router));

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjI0OWM0OGZlOTk3YmYzOTY2MDRhZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MTI5NTM0MDd9.R3lghNwiNYKIeifCsvblg5jq55OXjR5j3dHCHqwHF5w";

describe("GET Endpoints", () => {
  beforeAll(() => database.openConnection());
  afterAll(() => database.closeConnection());

  it("should return a coffee shops list", async (done) => {
    const result: any = await request(app)
      .get("/api/v1/coffeeShops")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(result.body).toHaveProperty("msg", "Success");
    expect(result.body.payload.length).toBeGreaterThanOrEqual(0);
    done();
  });

  it("should return a paginated coffee shops list", async (done) => {
    const result: any = await request(app)
      .get("/api/v1/coffeeShops/paginated?page=1&limit=5")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(result.body).toHaveProperty("msg", "Success");
    expect(result.body.payload).toHaveProperty("metadata");
    expect(result.body.payload).toHaveProperty("docs");
    done();
  });
});

describe("POST Endpoints", () => {
  beforeAll(() => database.openConnection());
  afterAll(() => database.closeConnection());

  it("should login user", async (done) => {
    const data = { username: "admin", password: "1234" };

    const result: any = await request(app)
      .post("/api/v1/auth")
      .set("Content-type", "application/json")
      .send(JSON.stringify(data))
      .expect(200);

    expect(result.body).toHaveProperty("msg", "Success");
    expect(typeof result.body.payload).toEqual("string");
    done();
  });

  it("should create an user", async (done) => {
    const data = {
      type: UserTypes.user,
      username: "test",
      password: "1234",
    };

    const result = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send(JSON.stringify(data))
      .expect(200);

    expect(result.body).toHaveProperty("msg", "Success");
    expect(result.body.payload).toHaveProperty("_id");
    expect(result.body.payload).toHaveProperty("createdAt");
    expect(result.body.payload).toHaveProperty("updatedAt");

    Object.keys(data).forEach((key) =>
      expect(result.body.payload).toHaveProperty(key)
    );
    await database.deleteMany(Collections.users, {
      username: data.username,
      type: data.type,
    });
    done();
  });

  it("should create a coffeeShop", async (done) => {
    const data = {
      name: "Test Coffee Shop",
    };

    const result = await request(app)
      .post("/api/v1/coffeeShops")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-type", "application/json")
      .send(JSON.stringify(data))
      .expect(200);

    expect(result.body).toHaveProperty("msg", "Success");
    expect(result.body.payload).toHaveProperty("_id");
    expect(result.body.payload).toHaveProperty("createdAt");
    expect(result.body.payload).toHaveProperty("updatedAt");

    Object.keys(data).forEach((key) =>
      expect(result.body.payload).toHaveProperty(key, data[key])
    );
    await database.deleteMany(Collections.coffeeShops, data);
    done();
  });

  it("should create a comment", async (done) => {
    const data = {
      title: "Test Comment",
      body: "Body comment",
      coffeeShop: "6023a15f4ef5dcf23ceb2818",
    };

    const result = await request(app)
      .post("/api/v1/comments")
      .send(data)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(result.body).toHaveProperty("msg", "Success");
    expect(result.body.payload).toHaveProperty("_id");
    expect(result.body.payload).toHaveProperty("createdAt");
    expect(result.body.payload).toHaveProperty("updatedAt");

    Object.keys(data).forEach((key) =>
      expect(result.body.payload).toHaveProperty(key, data[key])
    );

    await database.deleteMany(Collections.comments, data);

    done();
  });
});
