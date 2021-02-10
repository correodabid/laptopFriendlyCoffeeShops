import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "@root": "<rootDir>/src",
    "@api/(.*)": "<rootDir>/src/api/$1",
    "@schemes": "<rootDir>/src/schemes",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@handlers": "<rootDir>/src/handlers",
    "@interfaces": "<rootDir>/src/interfaces",
    "@services/(.*)": "<rootDir>/src/services/$1",
    "@middlewares": "<rootDir>/src/middlewares",
    "@connection/(.*)": "<rootDir>/src/connection/$1",
    "@utils": "<rootDir>/src/utils",
  },
};
export default config;
