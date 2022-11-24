import { Config as JestConfig } from "@jest/types";
import path from "path";

const preset: Partial<JestConfig.Argv> = {
  testRunner: "jasmine2",
  verbose: true,
  /** [This option allows the use of a custom global setup module which exports an async function that is triggered once before all test suites.](https://jestjs.io/docs/configuration#globalsetup-string) */
  globalSetup: path.join(__dirname, "global-setup"),
  /** [This option allows the use of a custom global teardown module which exports an async function that is triggered once after all test suites.](https://jestjs.io/docs/configuration#globalteardown-string) */
  globalTeardown: path.join(__dirname, "global-teardown"),
  setupFilesAfterEnv: ["jest-allure/dist/setup", path.join(__dirname, "setup-files-after-env")]
};

export default preset;
