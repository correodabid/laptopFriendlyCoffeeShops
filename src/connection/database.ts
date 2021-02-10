import { MongoClient, ObjectId } from "mongodb";
import constants from "@config/environment";
import { Indexes, Index } from "./indexes";
import { Collections, Pagination } from "@interfaces";

class Database {
  public client: any;
  private host = constants.mongodb.host;
  private dbName = constants.mongodb.name;
  private options = constants.mongodb.options;

  constructor(indexes: Index[]) {
    this.initializeIndexes(indexes);
  }

  private initializeIndexes = (indexes: Index[]) => {
    setTimeout(async () => {
      for await (let index of indexes) {
        await this.client
          .db(this.dbName)
          .collection(index.collection)
          .dropIndexes();
        for await (let item of index.items) {
          await this.client
            .db(this.dbName)
            .collection(index.collection)
            .createIndex(...item.payload);
        }
      }
    }, 5 * 1000);
  };

  public openConnection = async () => {
    const connection = new MongoClient(
      `${this.host}/${this.dbName}`,
      this.options
    );
    const client = await connection.connect();

    this.client = client;
  };

  public closeConnection = async () => {
    const client = this.client;
    client.close();
  };

  public findOne = async (
    collection: Collections,
    query: Object = {},
    projection?: any
  ) => {
    try {
      const _projection = { projection: projection };
      const db = this.client.db(this.dbName);
      const col = db.collection(collection);
      const result = await col.findOne(query, _projection);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  public paginate = async (
    collection: string,
    query: any = {},
    opts: Pagination = { limit: 10, page: 1 }
  ) => {
    const sorts = opts && opts.sort ? opts.sort?.split(" ") : ["_id"];
    let processedSorts = sorts!.reduce((acc, cur, i) => {
      cur.charAt(0) === "-" ? (acc[cur.substring(1)] = -1) : (acc[cur] = 1);
      return acc;
    }, {});

    const _query: any[] = [
      { $match: query },
      { $sort: sorts ? processedSorts : { _id: 1 } },
      {
        $facet: {
          metadata: [
            { $count: "totalDocs" },
            {
              $addFields: {
                page: opts.page || 1,
                limit: opts.limit,
                totalPages: { $ceil: { $divide: ["$totalDocs", opts.limit] } },
                prevPage:
                  (opts.page && opts.page === 1) || !opts.page
                    ? null
                    : opts.page - 1,
                nextPage: {
                  $cond: {
                    if: {
                      $lt: [
                        opts.page,
                        { $ceil: { $divide: ["$totalDocs", opts.limit] } },
                      ],
                    },
                    then: opts.page + 1,
                    else: null,
                  },
                },
              },
            },
          ],
          docs: [
            { $skip: (opts.page - 1) * opts.limit },
            { $limit: opts.limit },
          ],
        },
      },
      { $unwind: "$metadata" },
    ];

    opts.populate?.reduce((acc, cur, i) => {
      acc = {
        $lookup: {
          from: cur.from,
          let: { id: `$${cur.localField}` },
          pipeline: [
            { $match: { $expr: { $eq: [`$${cur.foreignField}`, "$$id"] } } },
          ],
          as: cur.as,
        },
      };
      _query.splice(2, 0, acc);
      cur.unwind
        ? _query.splice(3, 0, {
            $unwind: {
              path: `$${cur.as}`,
              preserveNullAndEmptyArrays: true,
            },
          })
        : null;
      return acc;
    }, {});

    const result: any = await this.client
      .db(this.dbName)
      .collection(collection)
      .aggregate(_query)
      .toArray()
      .catch((err: any) => console.log(err));

    return result[0]
      ? result[0]
      : {
          metadata: {
            totalDocs: 0,
            page: opts.page ? opts.page : 1,
            limit: opts.limit ? opts.limit : 10,
            totalPages: 0,
            prevPage: null,
            nextPage: null,
          },
          docs: [],
        };
  };

  public create = async (collection: Collections, doc: any) => {
    try {
      const db = this.client.db(this.dbName);
      const col = db.collection(collection);
      const date = new Date();
      const result = await col.insertOne({
        ...doc,
        ...{ updatedAt: date, createdAt: date },
      });

      return result.ops[0];
    } catch (error) {
      throw new Error(error);
    }
  };

  public insertMany = async (collection: Collections, docs: any[]) => {
    try {
      const db = this.client.db(this.dbName);
      const col = db.collection(collection);
      const date = new Date();

      const newDocs = docs.map((doc) => {
        if (doc._id) doc._id = new ObjectId(doc._id);
        return { ...doc, ...{ updatedAt: date, createdAt: date } };
      });

      const result = await col.insertMany(newDocs);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  public deleteMany = async (collection: Collections, query: any) => {
    const db = this.client.db(this.dbName);
    const col = db.collection(collection);
    const result = await col.deleteMany(query);
    return result.result;
  };

  public aggregate = async (collection: Collections, query: any[]) => {
    try {
      const db = this.client.db(this.dbName);
      const col = db.collection(collection);
      const result = await col.aggregate(query).toArray();

      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default new Database(Indexes);
