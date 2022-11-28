import callsites from "callsites";
import fs from "fs-extra";
import merge from "lodash/merge";
import path from "path";

import { Config } from "./types";
import { ALLURE_REPORTS_DIR } from "@common";

export const configure = (overrides?: Config) : Config => {
  // base directory of the implementing test
  const baseDir = path.dirname(callsites()[1].getFileName());
  // custom config defaults
  const custom = {
    globals: {
      iris: {
        baseDir,
        reports: {
          outDir: ALLURE_REPORTS_DIR,
        },
        snapshots: {
          schema: {
            outDir: ".snapshots/schema"
          }
        }
      }
    }
  };
  // resolve all known custom config directories, relative to the implementing config's file path
  const resolved = merge({}, custom, overrides);
  Object.keys(resolved.globals.iris.snapshots).forEach((key: keyof typeof resolved.globals.iris.snapshots) => {
    resolved.globals.iris.snapshots[key].outDir = path.resolve(resolved.globals.iris.baseDir, resolved.globals.iris.snapshots[key].outDir);
    resolved.globals.iris.snapshots[key].actualDir = path.resolve(resolved.globals.iris.snapshots[key].outDir, "actual");
    resolved.globals.iris.snapshots[key].baselineDir = path.resolve(resolved.globals.iris.snapshots[key].outDir, "baseline");
    resolved.globals.iris.snapshots[key].diffDir = path.resolve(resolved.globals.iris.snapshots[key].outDir, "diff");
  });
  resolved.globals.iris.reports.outDir = path.resolve(resolved.globals.iris.baseDir, resolved.globals.iris.reports.outDir);
  const { snapshots } = resolved.globals.iris;
  // remove directories: snapshots
  Object.keys(snapshots).forEach((key: keyof typeof snapshots) => {
    fs.removeSync(snapshots[key].actualDir);
    fs.removeSync(snapshots[key].diffDir);
    fs.mkdirsSync(snapshots[key].baselineDir);
  });
  // remove directories: reports
  const { reports } = resolved.globals.iris;
  fs.removeSync(reports.outDir);
  // jest preset goes here
  const preset = {
    preset: path.resolve(__dirname, "../../"),
  };
  return merge(preset, resolved);
};
