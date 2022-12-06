import {
  thenResponseBodyEquals,
  thenResponseSchemaEquals,
  thenResponseStatusEquals,
  whenSendRequest
} from "@iamkenos/iris";
import { TOKEN } from "@specs";
import { givenPostUserRequest, REQ_METHOD_POST, REQ_PATH } from "./";

describe(`[REST]: ${REQ_METHOD_POST} ${REQ_PATH}`, () => {
  it("S01: should require authentication", async() => {
    const request = givenPostUserRequest({
      name: "foo bar",
      email: "foo.bar@email.com",
      gender: "male",
      status: "active",
    });
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 401);
    thenResponseBodyEquals(response, { message: "Authentication failed" });
  });

  it("S02: should create a new user", async() => {
    const request = givenPostUserRequest(
      {
        name: "foo bar",
        email: `${Date.parse(new Date() as any)}@email.com`,
        gender: "male",
        status: "active",
      },
      { Authorization: TOKEN }
    );
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 201);
    await thenResponseSchemaEquals(response, "rest/user-schema");
  });
});
