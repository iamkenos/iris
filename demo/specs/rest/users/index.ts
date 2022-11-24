import { Request } from "@iamkenos/iris/client";
import { MimeType } from "@iamkenos/iris/common";
import { givenRequest } from "@iamkenos/iris/steps";
import { BASE_PATH, HOST } from "../";

export const REQ_ENDPOINT = "/users";
export const REQ_METHOD = "POST";
export const REQ_HEADERS = { "content-type": MimeType.APP_JSON };


export type PostUserRequestBody = {
  name: string;
  age?: string;
  job?: string;
};

export type PostUserResponseBody = {
  name: string;
  id: string;
  job?: string
  age?: string;
  createdAt: string;
};

export const givenPostUserRequest = (body: PostUserRequestBody): Request => {
  return givenRequest(`${HOST}${BASE_PATH}${REQ_ENDPOINT}`, {
    method: REQ_METHOD,
    headers: REQ_HEADERS,
    body
  });
};
