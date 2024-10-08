import type { Config as JestConfig } from "@jest/types";

declare global {
  var iris: { config: Config };
}

export interface Config extends Omit<Partial<JestConfig.Argv>, "globals"> {
  /** Custom: The base directory where most config paths will be resolved from */
  baseDir: string;
  /** Custom: Directory to store the reports in, relative to the config file */
  resultsDir: string;
  /** Custom: Directory to store the snapshots in, relative to the config file */
  snapshotsDir: string;
  /** Custom: Object containing properties of comparable files */
  snapshots: Snapshots;
  globals: {};
}

type SnapshotDirectories = {
  /** Directory under `outDir` where actual files are stored for comparison */
  actualDir?: string;
  /** Directory under `outDir` where expected files are stored for comparison */
  expectedDir?: string;
  /** Directory under `outDir` where differences are stored for comparison */
  diffDir?: string;
};

type SnapshotOptions = {
  /** Directory to store the output of this comparable object in, relative to the config file */
  outDir?: string;
  /** Skip comparison, just save the actual files */
  skipCompare?: boolean;
} & SnapshotDirectories;

type Snapshots = {
  /** Options used for comparing json schema */
  schema?: SnapshotOptions;
};
