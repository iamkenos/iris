import {
  givenRequest,
  Request
} from "@iamkenos/iris";

export const HOST = "https://reqres.in";
export const BASE_PATH = "/api";

export const REQ_ENDPOINT = "/";
export const REQ_METHOD = "GET";

export const givenGetRequest = (): Request => {
  return givenRequest(`${HOST}`, {
    method: REQ_METHOD
  });
};
