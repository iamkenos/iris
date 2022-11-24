import "tsconfig-paths/register";
import { configure } from "@iamkenos/iris/config"
import { pathsToModuleNameMapper as tspaths } from "ts-jest"
import { compilerOptions as options } from "./tsconfig.json"

export default configure({
  // moduleNameMapper: tspaths(options.paths, { prefix: "<rootDir>/" })
});

