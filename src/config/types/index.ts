// import type { PreFilterFunction } from "deep-diff";
import { Config as JestConfig } from "@jest/types";

// type SnapshotDirectories = {
//   /** Directory under `outDir` where actual files are stored for comparison */
//   actualDir?: string;
//   /** Directory under `outDir` where baseline files are stored for comparison */
//   baselineDir?: string;
//   /** Directory under `outDir` where differences are stored for comparison */
//   diffDir?: string;
// };

// type SnapshotOptions = {
//   /** Directory to store the output of this comparable object in, relative to the config file */
//   outDir?: string;
//   /** Skip comparison, just save the actual files */
//   skipCompare?: boolean;
// } & SnapshotDirectories;

// export type JSONSnapshotOptions = {
//   /** Conditional diffing based on [jsonpath](https://www.npmjs.com/package/jsonpath) and regex  */
//   regex?: {
//     paths: string[];
//     expressions: string[];
//   };
//   /** Same as `deep-diff`'s [prefilter](https://www.npmjs.com/package/deep-diff#pre-filtering-object-properties) function */
//   prefilter?: PreFilterFunction;
// } & SnapshotOptions;

export type CustomConfig = {
  /** Custom: The base directory where most config paths will be resolved from */
  baseDir: string;
};

export type Config = Partial<CustomConfig> & Partial <JestConfig.Argv>;
