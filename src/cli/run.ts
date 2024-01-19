import * as path from "path";

import yargs from "yargs";

const COMMANDS = [
  ["init", "", "Generate sample files to get started with"]
];

const USAGE = `
Usage:
npx kyoko [command] [options]

Commands:
${COMMANDS.map(([c, o, d]) => `  ${c}\t${o}\t${d}`).join("\n")}`;

export async function run() {
  const args = yargs.usage(USAGE).wrap(80);

  try {
    const [command, ...rest] = args.argv["_"];

    if (command) {
      const inCommands = COMMANDS.map(([c]) => c).includes(command);
      if (inCommands) {
        const file = path.join(__dirname, "commands", command);
        const module = require(file)[command];
        await module(...rest);
        process.exit(0);
      }
    }
    args.showHelp();
  } catch (e) {
    args.showHelp();
    console.error("\n", e);
    process.exit(1);
  }
}
