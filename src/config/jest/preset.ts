import * as path from "path";

import type { Config as JestConfig } from "@jest/types";

const preset: Partial<JestConfig.Argv> = {
  testRunner: "jasmine2",
  verbose: true,
  /** [This option allows the use of a custom global teardown module which exports an async function that is triggered once after all test suites.](https://jestjs.io/docs/configuration#globalteardown-string) */
  globalTeardown: path.join(__dirname, "global-teardown"),
  setupFilesAfterEnv: ["jest-allure/dist/setup", path.join(__dirname, "setup-files-after-env"), "jest-extended/all"]
};

export default preset;
