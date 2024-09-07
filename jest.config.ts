import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.ts"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    coverageDirectory: "coverage",
    extensionsToTreatAsEsm: [".ts"],
    transformIgnorePatterns: [],
};

export default config;
