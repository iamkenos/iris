import * as path from "path";

import type { Config as JestConfig } from "@jest/types";

const preset: Partial<JestConfig.Argv> = {
  testRunner: "jasmine2",
  verbose: true,
  setupFilesAfterEnv: ["jest-allure/dist/setup", path.join(__dirname, "setup-files-after-env"), "jest-extended/all"]
};

export default preset;
