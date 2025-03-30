const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!node-fetch|fetch-blob|formdata-polyfill)" // 👈 Transpile `node-fetch`
  ],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  globals: {
    TextEncoder: require("util").TextEncoder,
    TextDecoder: require("util").TextDecoder,
  },
};

module.exports = createJestConfig(customJestConfig);
