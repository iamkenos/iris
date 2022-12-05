import {
  whenSendRequest,
  thenResponseStatusEquals,
  thenResponseSchemaEquals,
} from "@iamkenos/iris";
import { REQ_METHOD_GET, REQ_PATH, givenGetUsersRequest } from "./";

describe(`[REST]: ${REQ_METHOD_GET} ${REQ_PATH}`, () => {
  it("S01: should return the list of all users", async () => {
    const request = givenGetUsersRequest();
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 200);
    thenResponseSchemaEquals(response, "rest/users-schema");
  });
});
