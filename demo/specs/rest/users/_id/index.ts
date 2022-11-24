import { Request } from "@iamkenos/iris/client";
import { givenRequest } from "@iamkenos/iris/steps";
import { BASE_PATH, HOST } from "../../";

export const REQ_PATH_PARAM_ID = "{id}";
export const REQ_ENDPOINT = "/users/" + REQ_PATH_PARAM_ID;
export const REQ_METHOD = "GET";

export type GetUserByIdResponseBody = {
  data: {
    id: number;
    email: string;
    first_name: string; // eslint-disable-line
    last_name: string; // eslint-disable-line
    avatar: string;
  },
  support: {
    url: string;
    text: string;
  }
};

export const givenGetUserByIdRequest = (id: string): Request => {
  return givenRequest(`${HOST}${BASE_PATH}${REQ_ENDPOINT.replace(REQ_PATH_PARAM_ID, id)}`, {
    method: REQ_METHOD
  });
};
