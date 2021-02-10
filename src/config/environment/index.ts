import envs from "./envs";

const all = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 7070,
  seedDB: false,
};

const env =
  (process.env.NODE_ENV as "development" | "test" | "production") ||
  "development";

export default { ...all, ...(envs[env] || {}) };
