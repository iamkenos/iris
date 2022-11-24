import callsites from "callsites";
import merge from "lodash/merge";
import path from "path";

import { Config } from "./types";

export const configure = (overrides: Config) : Config => {
  // custom config defaults
  const custom = {
    globals: {
      iris: {
        baseDir: path.dirname(callsites()[1].getFileName())
      }
    }
  };
  // resolve all known custom config directories, relative to the implementing config's file path
  const resolved = merge({}, custom, overrides);
  // jest preset goes here
  const preset = {
    preset: path.resolve(__dirname, "../../"),
  };
  return merge(preset, resolved);
};
