import type { Spec } from "@client";
import { AllureAdapter } from "@common";
import { capitalCase } from "change-case";
import { Request } from "@client";
import callsites from "callsites";

export const givenRequest = (url: string, options: Spec, isBodyIncluded = true) => {
  const request = new Request(url, { ...options });
  const fname = callsites()[1].getFunctionName();
  AllureAdapter.reporter().startStep(`${capitalCase(fname)}: ${request.spec.method} ${new URL(request.spec.url).pathname}`);
  AllureAdapter.attachRequest(request, isBodyIncluded);
  AllureAdapter.reporter().endStep();
  return request;
};
