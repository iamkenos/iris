import { capitalCase } from "change-case";
import { Response } from "@client";
import { AllureAdapter, isJSON, MimeType } from "@common";

export const formatStepName = (functionName: string, preferred = true) => {
  return preferred ? capitalCase(functionName) : `${capitalCase(functionName)} (Not)`;
};

export const thenPendingStep = (message: string) => {
  AllureAdapter.reporter().startStep(`${capitalCase(thenPendingStep.name)}: ${message}`);
  AllureAdapter.reporter().endStep("Pending" as any);
};

export const thenCookiesExist = (response: Response, preferred = true) => {
  AllureAdapter.reporter().startStep(formatStepName(thenCookiesExist.name, preferred));
  const cookies = response.headers["set-cookie"];
  const then = preferred ? expect(cookies).not : expect(cookies);
  then.toEqual(undefined);
  AllureAdapter.reporter().endStep();
};

export const thenCookiesEquals = (response: Response, expected: any, preferred = true) => {
  AllureAdapter.reporter().startStep(`${formatStepName(thenCookiesEquals.name, preferred)}: ${expected}`);
  const actual = response.headers["set-cookie"];
  const then = preferred ? expect(expected) : expect(expected).not;
  then.toEqual(actual);
  AllureAdapter.reporter().endStep();
};

export const thenResponseStatusEquals = (response: Response, expected = 200, preferred = true) => {
  const then = preferred ? expect(response.status) : expect(response.status).not;
  AllureAdapter.reporter().startStep(`${formatStepName(thenResponseStatusEquals.name, preferred)}: ${expected}`);
  then.toEqual(expected);
  AllureAdapter.reporter().endStep();
};

export const thenResponseBodyEquals = (response: Response, expected: any, preferred = true) => {
  const then = preferred ? expect(response.body) : expect(response.body).not;
  AllureAdapter.reporter().startStep(formatStepName(thenResponseBodyEquals.name, preferred));
  AllureAdapter.reporter().addAttachment("Expected", JSON.stringify(expected, null, 2), MimeType.APP_JSON);
  then.toEqual(expected);
  AllureAdapter.reporter().endStep();
};

export const thenResponseBodyPropEquals = (response: Response, prop: string, expected: any, preferred = true) => {
  const nested = prop.split(".").reduce((prev, cur) => prev[cur], response.body);
  const then = preferred ? expect(nested) : expect(nested).not;
  AllureAdapter.reporter().startStep(`${formatStepName(thenResponseBodyPropEquals.name, preferred)}: ${prop}`);
  AllureAdapter.reporter().addAttachment("Expected", isJSON ? JSON.stringify(expected, null, 2) : expected, MimeType.APP_JSON);
  then.toEqual(expected);
  AllureAdapter.reporter().endStep();
};

export const thenResponseBodyIsEmpty = (response: Response, preferred = true) => {
  const then = preferred ? expect(response.body) : expect(response.body).not;
  AllureAdapter.reporter().startStep(formatStepName(thenResponseBodyIsEmpty.name, preferred));
  then.toEqual("");
  AllureAdapter.reporter().endStep();
};

export const thenResponseTimeIsLessThan = (response: Response, expected: number, preferred = true) => {
  const then = preferred ? expect(response.time) : expect(response.time).not;
  AllureAdapter.reporter().startStep(`${formatStepName(thenResponseTimeIsLessThan.name, preferred)}: ${expected}`);
  then.toBeLessThan(expected);
  AllureAdapter.reporter().endStep();
};

export const thenResponseTimeIsGreaterThan = (response: Response, expected: number, preferred = true) => {
  const then = preferred ? expect(response.time) : expect(response.time).not;
  AllureAdapter.reporter().startStep(`${formatStepName(thenResponseTimeIsGreaterThan.name, preferred)}: ${expected}`);
  then.toBeGreaterThan(expected);
  AllureAdapter.reporter().endStep();
};

export const thenResponseSchemaEquals = async(response: Response, expected: string, preferred = true) => {
  const then = preferred ? expect(response.body) : expect(response.body).not;
  AllureAdapter.reporter().startStep(`${formatStepName(thenResponseSchemaEquals.name, preferred)}: ${expected}`);
  await then.toMatchJsonSchema(expected);
  AllureAdapter.reporter().endStep();
};
