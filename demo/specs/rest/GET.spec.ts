import {
  thenResponseBodyEquals,
  thenResponseBodyIsEmpty,
  thenResponseStatusEquals,
  thenResponseTimeIsLessThan,
  whenSendRequest
} from "@iamkenos/iris";
import {
  givenGetRequest,
  REQ_ENDPOINT,
  REQ_METHOD
} from "./";

describe(`[REST] Portal: ${REQ_METHOD} ${REQ_ENDPOINT}`, () => {
  it("S01: should return the portal response", async() => {
    const request = givenGetRequest();
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 200);
    thenResponseBodyIsEmpty(response, false);
    thenResponseBodyEquals(response, "foo", false);
    thenResponseTimeIsLessThan(response, 2000);
  });
});
