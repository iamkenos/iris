import * as fs from "fs-extra";
import * as path from "path";

import { isJSON } from "@common";
import { Request, Response } from "@client";
import { BufferEncoding, MimeType } from "./enums";
import { Reporter as JestReporter } from "jest-allure/src/Reporter";

declare let reporter: JestReporter;

export abstract class Reporter {

  public static directory() {
    return path.join(iris.config.resultsDir, "allure");
  }

  public static instance() {
    return reporter;
  }

  public static addAttachment(...args: Parameters<JestReporter["addAttachment"]>) {
    reporter.addAttachment(...args);
  }

  public static startStep(...args: Parameters<JestReporter["startStep"]>) {
    reporter.startStep(...args);
  }

  public static endStep(...args: Parameters<JestReporter["endStep"]>) {
    reporter.endStep(...args);
  }

  public static attachFile(title: string, filename: string, attachment: any, mimetype: string) {
    reporter.addAttachment(`${title}: ${filename}`, attachment, mimetype);
  }

  public static attachJSON(title: string, filename: string) {
    if (fs.existsSync(filename)) {
      const content = fs.readFileSync(filename, BufferEncoding.UTF8);
      this.attachFile(title, filename, isJSON(content) ? JSON.parse(content) : content, MimeType.APP_JSON);
    }
  }

  public static attachRequest(request: Request, shouldAttachBody = true) {
    // eslint-disable-next-line
    const { data: deleted, ...rest } = request.spec; // immutably delete data prop; it's redundant to body prop
    let spec = { ...rest };

    if (!shouldAttachBody) {
      // eslint-disable-next-line
      const { body: deleted, ...rest } = spec;
      spec = rest;
    }
    reporter.addAttachment("Request", JSON.stringify(spec, null, 2), MimeType.APP_JSON);
  }

  public static attachResponse(response: Response) {
    const { status, statusText, headers, time, body } = response;
    reporter.addAttachment("Response", JSON.stringify({ status, statusText, time: `${time}ms`, headers, body }, null, 2), MimeType.APP_JSON);
  }
}
