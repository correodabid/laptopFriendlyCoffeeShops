import { Collections } from "@interfaces";

export type Payload = {
  payload: Object[];
};

export type Index = {
  collection: Collections;
  items: Payload[];
};

export const Indexes: Index[] = [
  {
    collection: Collections.users,
    items: [{ payload: [{ username: 1 }, { unique: true }] }],
  },
  {
    collection: Collections.coffeeShops,
    items: [{ payload: [{ name: 1 }, { unique: true }] }],
  },
];
