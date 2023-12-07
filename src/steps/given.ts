import * as fs from "fs-extra";
import * as path from "path";

import { AllureAdapter, BufferEncoding, MimeType, changecase } from "@common";
import { Request } from "@client";

import callsites from "callsites";

import type { Spec } from "@client";

export const givenRequest = (url: string, options: Spec & { shouldAttachBody?: boolean }) => {
  const request = new Request(url, { ...options });
  const fname = callsites()[1].getFunctionName();
  AllureAdapter.startStep(`${changecase.capitalCase(fname)}: ${request.spec.method} ${new URL(request.spec.url).pathname}`);
  AllureAdapter.attachRequest(request, options.shouldAttachBody);
  AllureAdapter.endStep();
  return request;
};

export const givenGraphQLQueryFile = (file: string, variables?: any) => {
  const query = fs.readFileSync(path.join(global.iris.baseDir, file), BufferEncoding.UTF8);
  const data = { query, variables };
  AllureAdapter.startStep(`${changecase.capitalCase(givenGraphQLQueryFile.name)}: ${file}`);
  AllureAdapter.addAttachment("Query", JSON.stringify(data, null, 2), MimeType.TEXT_PLAIN);
  AllureAdapter.endStep();
  return data;
};
