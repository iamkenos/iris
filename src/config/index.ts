import * as fs from "fs-extra";
import * as path from "path";

import callsites from "callsites";
import dotenv from "dotenv";

import type { Config as BaseConfig } from "./types";
import type { NestedOmit } from "../common/types";

type Config = NestedOmit<BaseConfig, "baseDir">;

function loadEnv(baseDir: string) {
  const { NODE_ENV } = process.env;
  dotenv.config({ path: NODE_ENV ? path.join(baseDir, `.env.${NODE_ENV}`) : path.join(baseDir, ".env") });
}

function getConfigResultsDir(overrides: Partial<BaseConfig>) {
  const { RESULTS_DIR } = process.env;
  const { resultsDir = "results/", baseDir } = overrides;
  return path.join(baseDir, RESULTS_DIR ? RESULTS_DIR : resultsDir);
}

function getConfigSnapshotsDir(overrides: Partial<BaseConfig>) {
  const { SNAPSHOTS_DIR } = process.env;
  const { snapshotsDir = "snapshots/", baseDir } = overrides;
  return path.join(baseDir, SNAPSHOTS_DIR ? SNAPSHOTS_DIR : snapshotsDir);
}

function getConfigSnapshots(overrides: Partial<BaseConfig>) {
  const [ actualDir, expectedDir, diffDir ] = ["actual", "expected", "diff"];
  const { snapshots } = overrides;
  const snapshotsDir = getConfigSnapshotsDir(overrides);
  const snapshotOptions = {
    schema: {
      outDir: "schema",
      ...snapshots?.schema
    }
  };
  Object.keys(snapshotOptions).forEach(key => {
    snapshotOptions[key].outDir = path.resolve(snapshotsDir, snapshotOptions[key].outDir);
    snapshotOptions[key].actualDir = path.resolve(snapshotOptions[key].outDir, actualDir);
    snapshotOptions[key].expectedDir = path.resolve(snapshotOptions[key].outDir, expectedDir);
    snapshotOptions[key].diffDir = path.resolve(snapshotOptions[key].outDir, diffDir);
    fs.removeSync(snapshotOptions[key].actualDir);
    fs.removeSync(snapshotOptions[key].diffDir);
  });
  return snapshotOptions;
}

function getPresetTestResultsProcessor(overrides: Partial<BaseConfig>) {
  const resultsDir = getConfigResultsDir(overrides);
  process.env.JEST_HTML_REPORTER_OUTPUT_PATH = path.join(resultsDir, "report.html");
  process.env.JEST_HTML_REPORTER_INCLUDE_FAILURE_MSG = "true";
  process.env.JEST_HTML_REPORTER_INCLUDE_SUITE_FAILURE = "true";

  const testResultsProcessor = path.join(process.cwd(), "node_modules/jest-html-reporter");
  return testResultsProcessor;
}

export function configure(overrides: Partial<Config> = {}) {
  const baseDir = path.dirname(callsites()[1].getFileName()).replace("file://", "");
  loadEnv(baseDir);

  // custom options defaults
  overrides.baseDir = baseDir;
  const iris = {
    baseDir,
    resultsDir: getConfigResultsDir(overrides),
    snapshots: getConfigSnapshots(overrides)
  };

  // jest options defaults
  const config: Config & { globals?: any } = {
    ...overrides,
    preset: path.resolve(__dirname, "../../"),
    testResultsProcessor: getPresetTestResultsProcessor(overrides)
  };

  // remove custom config props from here then assign everything under globals so we can get the config object from there
  delete config.baseDir;
  const { resultsDir, snapshotsDir, snapshots, globals, ...rest } = config; // eslint-disable-line
  config.globals = { ...globals, iris: { config: { ...iris, ...rest } } };

  return config;
}
