import type { Config } from "@jest/types";

import { AllureAdapter } from "@iamkenos/iris/common/utils";
import { DIM_COLOR } from "jest-matcher-utils";
import path from "path";

/**
 * Any global variables that are defined through globalSetup can only be read in globalTeardown.
 * You cannot retrieve globals defined here in your test suites
 * @see [Configuring Jest](https://jestjs.io/docs/configuration#globalsetup-string)
 */
export default async(config: Config.GlobalConfig) => {
  const raw = path.join(config.rootDir, ".reports", "allure");
  const html = path.join(raw, "html");
  await AllureAdapter.cli(["-q", "generate", raw, "-c", "-o", html]);

  console.log("");
  console.log("To serve generated reports, execute: ");
  console.log(DIM_COLOR(`$ npx allure open '${html}'`));
};
