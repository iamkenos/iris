import * as fs from "fs-extra";
import * as path from "path";

import { ALLURE_REPORTS_DIR } from "@common";

import callsites from "callsites";
import merge from "lodash.merge";

import type { Config } from "./types";

export function configure(overrides?: Partial<Config>) {
  // custom options defaults
  const baseDir = path.dirname(callsites()[1].getFileName());
  const custom = {
    globals: {
      iris: {
        baseDir,
        resultsDir: path.resolve(baseDir, overrides?.globals?.iris?.resultsDir || ALLURE_REPORTS_DIR),
        snapshots: {
          schema: {
            outDir: "snapshots/schema"
          }
        }
      }
    }
  };
  // resolve and prepare directories
  const resolved = merge({}, custom, overrides);
  const { snapshots, resultsDir } = resolved.globals.iris;
  fs.removeSync(resultsDir);
  Object.keys(snapshots).forEach((key: keyof typeof snapshots) => {
    snapshots[key].outDir = path.resolve(baseDir, snapshots[key].outDir);
    snapshots[key].actualDir = path.resolve(snapshots[key].outDir, "actual");
    snapshots[key].expectedDir = path.resolve(snapshots[key].outDir, "expected");
    snapshots[key].diffDir = path.resolve(snapshots[key].outDir, "diff");
    fs.removeSync(snapshots[key].actualDir);
    fs.removeSync(snapshots[key].diffDir);
    fs.mkdirsSync(snapshots[key].expectedDir);
  });

  // jest preset goes here
  const preset = {
    preset: path.resolve(__dirname, "../../"),
  };
  return merge(preset, resolved);
}
