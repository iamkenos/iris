import {
  thenResponseStatusEquals,
  whenSendRequest
} from "@iamkenos/iris/steps";
import {
  givenGetUserByIdRequest,
  REQ_ENDPOINT,
  REQ_METHOD
} from "./";

describe(`[REST] Users: ${REQ_METHOD} ${REQ_ENDPOINT}`, () => {
  it("S01: should return the user data", async() => {
    const request = givenGetUserByIdRequest("2");
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 200);
  });
});
