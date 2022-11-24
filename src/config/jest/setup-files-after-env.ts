import { AllureAdapter } from "@common";
declare let global: any;

global
  .reporter
  .allure
  .setOptions({ targetDir: AllureAdapter.getRawDir() });
