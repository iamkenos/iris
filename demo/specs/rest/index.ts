import { Request } from "@iamkenos/iris/client";
import { givenRequest } from "@iamkenos/iris/steps";

export const HOST = "https://reqres.in";
export const BASE_PATH = "/api";

export const REQ_ENDPOINT = "/";
export const REQ_METHOD = "GET";

export const givenGetRequest = (): Request => {
  return givenRequest(`${HOST}`, {
    method: REQ_METHOD
  });
};
