import { Config as JestConfig } from "@jest/types";

export type CustomConfig = {
  globals: {
    iris: {
      /** Custom: The base directory where most config paths will be resolved from */
      baseDir: string;
    }
  }
};

export type Config = Partial<CustomConfig> & Partial <JestConfig.Argv>;
