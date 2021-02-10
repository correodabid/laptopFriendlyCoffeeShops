import chalk from "chalk";

import { users } from "@config/seeds/users";
import { coffeeShops } from "@config/seeds/coffeeShops";
import { comments } from "@config/seeds/comments";

import database from "@connection/database";

import { Collections } from "@interfaces";
import { coffeShopValidator, commentValidator, userValidator } from "@schemes";
import { encrypt } from "@utils";

const validator = (validator: any, seed: any[]) => {
  const validObject = seed.map((item: any) => {
    const valid = validator.validate(item);
    if (valid.error) throw valid.error;
    return valid.value;
  });
  return validObject;
};

export default async () => {
  try {
    const SEEDS_DONE = chalk.bgRed("Seeds done");
    console.time(SEEDS_DONE);

    const seedUsers = validator(userValidator, users);
    const seedCoffeShops = validator(coffeShopValidator, coffeeShops);
    const seedComments = validator(commentValidator, comments);

    await database.openConnection();

    await database.deleteMany(Collections.users, {});
    await database.deleteMany(Collections.coffeeShops, {});
    await database.deleteMany(Collections.comments, {});

    for await (let seedUser of seedUsers) {
      await database.create(Collections.users, {
        ...seedUser,
        ...{ password: await encrypt(seedUser.password) },
      });
    }
    await database.insertMany(Collections.coffeeShops, seedCoffeShops);
    await database.insertMany(Collections.comments, seedComments);

    console.timeEnd(SEEDS_DONE);
    return;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
