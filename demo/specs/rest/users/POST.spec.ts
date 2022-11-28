import {
  thenResponseSchemaEquals,
  thenResponseStatusEquals,
  whenSendRequest
} from "@iamkenos/iris";
import {
  givenPostUserRequest,
  PostUserRequestBody,
  REQ_ENDPOINT,
  REQ_METHOD
} from "./";

describe(`[REST] Users: ${REQ_METHOD} ${REQ_ENDPOINT}`, () => {
  it("S01: should create user data", async() => {
    const payload: PostUserRequestBody = { name: "no face", job: "ghost" };
    const request = givenPostUserRequest(payload);
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 201);
    thenResponseSchemaEquals(response, "rest/users/post-user");
  });
});
