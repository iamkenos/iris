import * as fs from "fs-extra";
import * as path from "path";

import cli from "allure-commandline";

import { isJSON } from "@common";
import { Request, Response } from "@client";
import { BufferEncoding, MimeType } from "./enums";
import { Reporter } from "jest-allure/src/Reporter";

declare let reporter: Reporter;
declare let global: any;

export const ALLURE_RAW_DIR = "allure";

export const ALLURE_HTML_DIR = "html";

export const ALLURE_REPORTS_DIR = "results";

export abstract class AllureAdapter {
  public static async cli(args: string[]) {
    await cli(args);
  }

  public static getRawDir() {
    return path.join(global.iris.baseDir, ALLURE_REPORTS_DIR, ALLURE_RAW_DIR);
  }

  public static getHtmlDir() {
    return path.join(AllureAdapter.getRawDir(), ALLURE_HTML_DIR);
  }

  public static reporter() {
    return reporter;
  }

  public static addAttachment(...args: Parameters<Reporter["addAttachment"]>) {
    reporter.addAttachment(...args);
  }

  public static startStep(...args: Parameters<Reporter["startStep"]>) {
    reporter.startStep(...args);
  }

  public static endStep(...args: Parameters<Reporter["endStep"]>) {
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
