import type { Spec } from "@client";
import { AllureAdapter, BufferEncoding, MimeType } from "@common";
import { capitalCase } from "change-case";
import { Request } from "@client";
import callsites from "callsites";
import fs from "fs-extra";
import path from "path";

export const givenRequest = (url: string, options: Spec, isBodyIncluded = true) => {
  const request = new Request(url, { ...options });
  const fname = callsites()[1].getFunctionName();
  AllureAdapter.reporter().startStep(`${capitalCase(fname)}: ${request.spec.method} ${new URL(request.spec.url).pathname}`);
  AllureAdapter.attachRequest(request, isBodyIncluded);
  AllureAdapter.reporter().endStep();
  return request;
};

export const givenGraphQLQueryFile = (file: string, variables?: any) => {
  const query = fs.readFileSync(path.join(global.iris.baseDir, file), BufferEncoding.UTF8);
  const data = { query, variables };
  AllureAdapter.reporter().startStep(`${capitalCase(givenGraphQLQueryFile.name)}: ${file}`);
  AllureAdapter.reporter().addAttachment("Query", JSON.stringify(data, null, 2), MimeType.TEXT_PLAIN);
  AllureAdapter.reporter().endStep();
  return data;
};
