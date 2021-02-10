export default {
  development: {
    URI: { v1: "/api/v1" },
    mongodb: {
      name: "mmg-test-dev",
      host: "mongodb://localhost:27017",
      username: null,
      password: null,
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    },
    secret: "5f6396fceb9a38917c4081b3831e6533",
    seedDB: true,
  },
  test: {
    URI: { v1: "/api/v1" },
    mongodb: {
      name: "mmg-test-dev",
      host: "mongodb://localhost:27017",
      username: null,
      password: null,
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    },
    secret: "5f6396fceb9a38917c4081b3831e6533",
    seedDB: true,
  },
  production: {
    URI: { v1: "/api/v1" },
    mongodb: {
      name: "mmg-test-dev",
      host: "mongodb://localhost:27017",
      username: null,
      password: null,
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    },
    secret: "5f6396fceb9a38917c4081b3831e6533",
    seedDB: true,
  },
};
