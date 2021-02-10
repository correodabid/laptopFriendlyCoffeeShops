import { CoffeeShopService } from "@api/v1/coffeShops/coffeeShop.service";
import database from "@connection/database";
import { Collections } from "@interfaces";
import { CoffeeShop } from "@schemes";
import { ObjectId } from "mongodb";

const fakeCoffeeShop: CoffeeShop = {
  name: "fake",
  createdBy: "602249c48fe997bf396604af",
};

describe("Coffee Shops Test", () => {
  let id: string | ObjectId;

  beforeAll(async () => await database.openConnection());
  afterAll(async () => {
    await database.deleteMany(Collections.coffeeShops, {
      name: fakeCoffeeShop.name,
    });
    await database.closeConnection();
  });

  it("should create a new coffee shop", async () => {
    const result = await CoffeeShopService.createCoffeeShop(fakeCoffeeShop);
    id = result._id;
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("createdBy");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");
    expect(result).toHaveProperty("commentable", true);
  });

  it("should return a coffeeShop by ID", async () => {
    const result = await CoffeeShopService.getCoffeeShopById(id);
    expect(result).toHaveProperty("_id", id);
  });

  it("should return list of coffee shops", async () => {
    const result = await CoffeeShopService.getCoffeeShops();
    expect(result[0]).toHaveProperty("comments");
  });

  it("should return a paginated list of coffee shops", async () => {
    const result = await CoffeeShopService.getPaginatedCoffeeShops();
    expect(result).toHaveProperty("metadata");
    expect(result).toHaveProperty("docs");
    expect(result.docs.length).toBeGreaterThan(0);
  });
});
