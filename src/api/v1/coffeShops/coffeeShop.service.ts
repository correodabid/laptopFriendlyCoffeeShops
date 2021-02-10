import database from "@connection/database";
import { Collections, Pagination } from "@interfaces";
import { CoffeeShop, coffeShopValidator } from "@schemes";
import { ObjectId } from "mongodb";

export namespace CoffeeShopService {
  export const getPaginatedCoffeeShops = async (
    query: any = {},
    params?: any
  ) => {
    try {
      const opts: Pagination = {
        limit: params?.limit ? parseInt(params.limit) : 10,
        page: params?.page ? parseInt(params.page) : 1,
        populate: [
          {
            from: Collections.comments,
            localField: "_id",
            foreignField: "coffeeShop",
            as: "comments",
            unwind: false,
          },
        ],
      };
      const result = await database.paginate(
        Collections.coffeeShops,
        query,
        opts
      );
      return result;
    } catch (error) {
      throw error;
    }
  };

  export const getCoffeeShops = async () => {
    try {
      const result = await database.aggregate(Collections.coffeeShops, [
        {
          $lookup: {
            from: Collections.comments,
            localField: "_id",
            foreignField: "coffeeShop",
            as: "comments",
          },
        },
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  export const getCoffeeShopById = async (id: string | ObjectId) => {
    try {
      const coffeeShopId = typeof id === "string" ? new ObjectId(id) : id;
      const result = await database.findOne(Collections.coffeeShops, {
        _id: coffeeShopId,
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  export const createCoffeeShop = async (coffeeShop: CoffeeShop) => {
    try {
      const validCoffeeShop = coffeShopValidator.validate(coffeeShop);
      if (validCoffeeShop.error) throw validCoffeeShop.error;
      const result = await database.create(
        Collections.coffeeShops,
        validCoffeeShop.value
      );
      return result;
    } catch (error) {
      throw error;
    }
  };
}
