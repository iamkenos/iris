import * as fs from "fs-extra";
import * as path from "path";

import { BufferEncoding, changecase, MimeType, Reporter } from "@common";
import { Request } from "@client";

import callsites from "callsites";

import type { Spec } from "@client";

export const givenRequest = (url: string, options: Spec & { shouldAttachBody?: boolean }) => {
  const request = new Request(url, { ...options });
  const fname = callsites()[1].getFunctionName();
  Reporter.startStep(`${changecase.capitalCase(fname)}: ${request.spec.method} ${new URL(request.spec.url).pathname}`);
  Reporter.attachRequest(request, options.shouldAttachBody);
  Reporter.endStep();
  return request;
};

export const givenGraphQLQueryFile = (file: string, variables?: any) => {
  const query = fs.readFileSync(path.join(iris.config.baseDir, file), BufferEncoding.UTF8);
  const data = { query, variables };
  Reporter.startStep(`${changecase.capitalCase(givenGraphQLQueryFile.name)}: ${file}`);
  Reporter.addAttachment("Query", JSON.stringify(data, null, 2), MimeType.TEXT_PLAIN);
  Reporter.endStep();
  return data;
};
