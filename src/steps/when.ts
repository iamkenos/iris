import { AllureAdapter, changecase } from "@common";
import { Request, Response } from "@client";

export const whenSendRequest = async<T = any>(request: Request): Promise<Response & { body: T }> => {
  AllureAdapter.startStep(`${changecase.capitalCase(whenSendRequest.name)}: ${request.spec.method} ${new URL(request.spec.url).pathname}`);
  const response = await request.send();
  AllureAdapter.attachResponse(response);
  AllureAdapter.endStep();
  return response as Response & { body: T };
};
