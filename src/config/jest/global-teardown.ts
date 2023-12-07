import * as path from "path";

import { DIM_COLOR } from "jest-matcher-utils";
import { ALLURE_HTML_DIR, ALLURE_RAW_DIR, ALLURE_REPORTS_DIR, AllureAdapter } from "@common";

import type { Config } from "@jest/types";

/**
 * Any global variables that are defined through globalSetup can only be read in globalTeardown.
 * You cannot retrieve globals defined here in your test suites
 * @see [Configuring Jest](https://jestjs.io/docs/configuration#globalsetup-string)
 */
export default async(config: Config.GlobalConfig) => {
  const raw = path.join(config.rootDir, ALLURE_REPORTS_DIR, ALLURE_RAW_DIR);
  const html = path.join(raw, ALLURE_HTML_DIR);
  await AllureAdapter.cli(["-q", "generate", raw, "-c", "-o", html]);

  console.log("");
  console.log("To serve generated reports, execute:");
  console.log(DIM_COLOR(`$ npx allure open '${html}'`));
};
