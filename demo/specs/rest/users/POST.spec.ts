import {
  PostUserRequestBody,
  REQ_ENDPOINT,
  REQ_METHOD
} from "./";

describe(`[REST] Users: ${REQ_METHOD} ${REQ_ENDPOINT}`, () => {
  it("S01: should create user data", async() => {
    console.log("from test", (global as any).baseDir);
  });
});
