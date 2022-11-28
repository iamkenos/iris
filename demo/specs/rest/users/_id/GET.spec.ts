import {
  thenResponseBodyEquals,
  thenResponseBodyPropEquals,
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
    const expected = {
      data: {
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://reqres.in/img/faces/2-image.jpg"
      },
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!"
      }
    };

    thenResponseStatusEquals(response, 200);
    // check individual props
    thenResponseBodyPropEquals(response, "data.id", expected.data.id);
    thenResponseBodyPropEquals(response, "data.first_name", expected.data.first_name);
    thenResponseBodyPropEquals(response, "data.last_name", expected.data.last_name);
    thenResponseBodyPropEquals(response, "data.email", expected.data.email);
    // check the entire response body
    thenResponseBodyEquals(response, expected);
  });
});
