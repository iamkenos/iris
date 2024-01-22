import {
  thenResponseSchemaEquals,
  thenResponseStatusEquals,
  whenSendRequest,
} from "@iamkenos/iris";
import { givenUserQueryRequest, givenUsersQueryRequest, REQ_PATH } from "./";

describe(`[GraphQL]: ${REQ_PATH}`, () => {
  it.each([6007072, 6007073])("S01: should return details of a specific user: %i", async(id) => {
    const request = givenUserQueryRequest(id);
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 200);
    await thenResponseSchemaEquals(response, "graphql/user-schema", false);
  });

  it("S02: should return the list of all users", async() => {
    const request = givenUsersQueryRequest();
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 200);
    await thenResponseSchemaEquals(response, "graphql/users-schema");
  });
});
