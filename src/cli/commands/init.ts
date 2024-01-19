import * as fs from "fs-extra";
import * as path from "path";

const SUCCESS_MESSAGE = `
Success!

To run your tests:
 - npm test`;

export function init() {
  const source = path.join(__dirname, "../", "resources");
  const target = process.cwd();

  const ignoreSource = path.join(target, "ignore.tpl");
  const ignoretarget = path.join(target, ".gitignore");

  process.stdout.write("Creating files...");
  fs.copySync(source, target);
  fs.moveSync(ignoreSource, ignoretarget);
  console.log(SUCCESS_MESSAGE.trim());
}
