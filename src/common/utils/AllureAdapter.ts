import { Reporter } from "jest-allure/src/Reporter";
import cli from "allure-commandline";
import fs from "fs-extra";

declare let reporter: Reporter;

import { BufferEncoding, MimeType } from "./enums";

export abstract class AllureAdapter {
  public static async cli(args: string[]) {
    await cli(args);
  }

  public static reporter() {
    return reporter;
  }

  public static attachFile(title: string, filename: string, attachment: any, mimetype: string) {
    reporter.addAttachment(`${title}: ${filename}`, attachment, mimetype);
  }

  public static attachJSON(title: string, filename: string) {
    if (fs.existsSync(filename)) {
      const content = fs.readFileSync(filename, BufferEncoding.UTF8);
      try {
        this.attachFile(title, filename, JSON.parse(content), MimeType.APP_JSON);
      } catch (e) {
        this.attachFile(title, filename, content, MimeType.APP_JSON);
      }
    }
  }
}
