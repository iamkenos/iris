import { givenRequest, Request } from "@iamkenos/iris";
import { BASE_URL } from "@specs";

export const REQ_PATH = "/public/v2/users";
export const REQ_METHOD_GET = "GET";
export const REQ_METHOD_POST = "POST";

export type PostUserRequestBody = {
  name: string;
  email: string;
  gender: "male" | "female";
  status: "active" | "inactive";
}

export function givenGetUsersRequest() {
  return givenRequest(`${BASE_URL}${REQ_PATH}`, {
    method: REQ_METHOD_GET,
  });
}

export function givenGetUsersRequestByQueryParam(params: { [key: string]: string }) {
  return givenRequest(`${BASE_URL}${REQ_PATH}`, {
    method: REQ_METHOD_GET,
    params
  });
}

export function givenPostUserRequest(body: PostUserRequestBody, headers?: Request["spec"]["headers"]) {
  return givenRequest(`${BASE_URL}${REQ_PATH}`, {
    method: REQ_METHOD_POST,
    headers,
    body
  });
}
