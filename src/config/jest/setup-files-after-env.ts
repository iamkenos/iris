import { Reporter } from "@common";

declare let global: any;

global
  .reporter
  .allure
  .setOptions({ targetDir: Reporter.directory() });
