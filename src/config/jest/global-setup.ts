import type { Config } from "@jest/types";

/**
 * Any global variables that are defined through globalSetup can only be read in globalTeardown.
 * You cannot retrieve globals defined here in your test suites
 * @see [Configuring Jest](https://jestjs.io/docs/configuration#globalsetup-string)
 */
export default (config: Config.GlobalConfig) => {
  // TODO
};
