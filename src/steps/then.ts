import { Response } from "@client";
import { AllureAdapter, changecase, isJSON, MimeType } from "@common";

export const formatStepName = (functionName: string, preferred = true) => {
  return preferred ? changecase.capitalCase(functionName) : `${changecase.capitalCase(functionName)} (Not)`;
};

export const thenPendingStep = (message: string) => {
  AllureAdapter.startStep(`${changecase.capitalCase(thenPendingStep.name)}: ${message}`);
  AllureAdapter.endStep("Pending" as any);
};

export const thenCookiesExist = (response: Response, preferred = true) => {
  AllureAdapter.startStep(formatStepName(thenCookiesExist.name, preferred));
  const cookies = response.headers["set-cookie"];
  const then = preferred ? expect(cookies).not : expect(cookies);
  then.toEqual(undefined);
  AllureAdapter.endStep();
};

export const thenCookiesEquals = (response: Response, expected: any, preferred = true) => {
  AllureAdapter.startStep(`${formatStepName(thenCookiesEquals.name, preferred)}: ${expected}`);
  const actual = response.headers["set-cookie"];
  const then = preferred ? expect(expected) : expect(expected).not;
  then.toEqual(actual);
  AllureAdapter.endStep();
};

export const thenResponseStatusEquals = (response: Response, expected = 200, preferred = true) => {
  const then = preferred ? expect(response.status) : expect(response.status).not;
  AllureAdapter.startStep(`${formatStepName(thenResponseStatusEquals.name, preferred)}: ${expected}`);
  then.toEqual(expected);
  AllureAdapter.endStep();
};

export const thenResponseBodyEquals = (response: Response, expected: any, preferred = true) => {
  const then = preferred ? expect(response.body) : expect(response.body).not;
  AllureAdapter.startStep(formatStepName(thenResponseBodyEquals.name, preferred));
  AllureAdapter.addAttachment("Expected", JSON.stringify(expected, null, 2), MimeType.APP_JSON);
  then.toEqual(expected);
  AllureAdapter.endStep();
};

export const thenResponseBodyPropEquals = (response: Response, prop: string, expected: any, preferred = true) => {
  const nested = prop.split(".").reduce((prev, cur) => prev[cur], response.body);
  const then = preferred ? expect(nested) : expect(nested).not;
  AllureAdapter.startStep(`${formatStepName(thenResponseBodyPropEquals.name, preferred)}: ${prop}`);
  AllureAdapter.addAttachment("Expected", isJSON ? JSON.stringify(expected, null, 2) : expected, MimeType.APP_JSON);
  then.toEqual(expected);
  AllureAdapter.endStep();
};

export const thenResponseBodyIsEmpty = (response: Response, preferred = true) => {
  const then = preferred ? expect(response.body) : expect(response.body).not;
  AllureAdapter.startStep(formatStepName(thenResponseBodyIsEmpty.name, preferred));
  then.toEqual("");
  AllureAdapter.endStep();
};

export const thenResponseTimeIsLessThan = (response: Response, expected: number, preferred = true) => {
  const then = preferred ? expect(response.time) : expect(response.time).not;
  AllureAdapter.startStep(`${formatStepName(thenResponseTimeIsLessThan.name, preferred)}: ${expected}`);
  then.toBeLessThan(expected);
  AllureAdapter.endStep();
};

export const thenResponseTimeIsGreaterThan = (response: Response, expected: number, preferred = true) => {
  const then = preferred ? expect(response.time) : expect(response.time).not;
  AllureAdapter.startStep(`${formatStepName(thenResponseTimeIsGreaterThan.name, preferred)}: ${expected}`);
  then.toBeGreaterThan(expected);
  AllureAdapter.endStep();
};

export const thenResponseSchemaEquals = async(response: Response, expected: string, preferred = true) => {
  const then = preferred ? expect(response.body) : expect(response.body).not;
  AllureAdapter.startStep(`${formatStepName(thenResponseSchemaEquals.name, preferred)}: ${expected}`);
  await then.toMatchJsonSchema(expected);
  AllureAdapter.endStep();
};
