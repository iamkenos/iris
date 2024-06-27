import { Reporter, changecase } from "@common";
import { Request, Response } from "@client";

export const whenSendRequest = async<T = any>(request: Request): Promise<Response & { body: T }> => {
  Reporter.startStep(`${changecase.capitalCase(whenSendRequest.name)}: ${request.spec.method} ${new URL(request.spec.url).pathname}`);
  const response = await request.send();
  Reporter.attachResponse(response);
  Reporter.endStep();
  return response as Response & { body: T };
};
