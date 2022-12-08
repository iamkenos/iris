import {
  thenResponseSchemaEquals,
  thenResponseStatusEquals,
  whenSendRequest,
} from "@iamkenos/iris";
import axios from "axios";
import { givenGetUsersRequest, givenGetUsersRequestByQueryParam, REQ_METHOD_GET, REQ_PATH } from "./";

describe(`[REST]: ${REQ_METHOD_GET} ${REQ_PATH}`, () => {
  it("S01A: should return details of a specific type of user: Default", async() => {
    const response = await axios("https://gorest.co.in/public/v2/users", {
      method: "GET",
      params: {
        gender: "female",
        status: "active",
      }
    });

    expect(response.status).toEqual(200);
    expect(response.data.length).toBeGreaterThan(0);
    response.data.forEach(item => {
      expect(item.gender).toEqual("female");
      expect(item.status).toEqual("active");
    });
  });

  it("S01B: should return details of a specific type of user: Abstracted", async() => {
    const request = givenGetUsersRequestByQueryParam({ gender: "female", status: "active" });
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 200);
    await thenResponseSchemaEquals(response, "rest/users-female-active-schema");
  });

  it("S02: should return the list of all users", async() => {
    const request = givenGetUsersRequest();
    const response = await whenSendRequest(request);

    thenResponseStatusEquals(response, 200);
    await thenResponseSchemaEquals(response, "rest/users-schema");
  });
});
