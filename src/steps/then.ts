import { Response } from "@client";
import { changecase, isJSON, MimeType, Reporter } from "@common";

export const formatStepName = (functionName: string, preferred = true) => {
  return preferred ? changecase.capitalCase(functionName) : `${changecase.capitalCase(functionName)} (Not)`;
};

export const thenPendingStep = (message: string) => {
  Reporter.startStep(`${changecase.capitalCase(thenPendingStep.name)}: ${message}`);
  Reporter.endStep("Pending" as any);
};

export const thenCookiesExist = (response: Response, preferred = true) => {
  Reporter.startStep(formatStepName(thenCookiesExist.name, preferred));
  const cookies = response.headers["set-cookie"];
  const then = preferred ? expect(cookies).not : expect(cookies);
  then.toEqual(undefined);
  Reporter.endStep();
};

export const thenCookiesEquals = (response: Response, expected: any, preferred = true) => {
  Reporter.startStep(`${formatStepName(thenCookiesEquals.name, preferred)}: ${expected}`);
  const actual = response.headers["set-cookie"];
  const then = preferred ? expect(expected) : expect(expected).not;
  then.toEqual(actual);
  Reporter.endStep();
};

export const thenResponseStatusEquals = (response: Response, expected = 200, preferred = true) => {
  const then = preferred ? expect(response.status) : expect(response.status).not;
  Reporter.startStep(`${formatStepName(thenResponseStatusEquals.name, preferred)}: ${expected}`);
  then.toEqual(expected);
  Reporter.endStep();
};

export const thenResponseBodyEquals = (response: Response, expected: any, preferred = true) => {
  const then = preferred ? expect(response.body) : expect(response.body).not;
  Reporter.startStep(formatStepName(thenResponseBodyEquals.name, preferred));
  Reporter.addAttachment("Expected", JSON.stringify(expected, null, 2), MimeType.APP_JSON);
  then.toEqual(expected);
  Reporter.endStep();
};

export const thenResponseBodyPropEquals = (response: Response, prop: string, expected: any, preferred = true) => {
  const nested = prop.split(".").reduce((prev, cur) => prev[cur], response.body);
  const then = preferred ? expect(nested) : expect(nested).not;
  Reporter.startStep(`${formatStepName(thenResponseBodyPropEquals.name, preferred)}: ${prop}`);
  Reporter.addAttachment("Expected", isJSON ? JSON.stringify(expected, null, 2) : expected, MimeType.APP_JSON);
  then.toEqual(expected);
  Reporter.endStep();
};

export const thenResponseBodyIsEmpty = (response: Response, preferred = true) => {
  const then = preferred ? expect(response.body) : expect(response.body).not;
  Reporter.startStep(formatStepName(thenResponseBodyIsEmpty.name, preferred));
  then.toEqual("");
  Reporter.endStep();
};

export const thenResponseTimeIsLessThan = (response: Response, expected: number, preferred = true) => {
  const then = preferred ? expect(response.time) : expect(response.time).not;
  Reporter.startStep(`${formatStepName(thenResponseTimeIsLessThan.name, preferred)}: ${expected}`);
  then.toBeLessThan(expected);
  Reporter.endStep();
};

export const thenResponseTimeIsGreaterThan = (response: Response, expected: number, preferred = true) => {
  const then = preferred ? expect(response.time) : expect(response.time).not;
  Reporter.startStep(`${formatStepName(thenResponseTimeIsGreaterThan.name, preferred)}: ${expected}`);
  then.toBeGreaterThan(expected);
  Reporter.endStep();
};

export const thenResponseSchemaEquals = async(response: Response, expected: string, preferred = true) => {
  const then = preferred ? expect(response.body) : expect(response.body).not;
  Reporter.startStep(`${formatStepName(thenResponseSchemaEquals.name, preferred)}: ${expected}`);
  await then.toMatchJsonSchema(expected);
  Reporter.endStep();
};
