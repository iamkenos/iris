<!-- markdownlint-disable MD033 -->
<h1 align="center">IRIS</h1>

<!-- TODO: CHANGE THIS -->
<p align="center">
  <a href="https://github.com/iamkenos/hornet/actions/workflows/unit-tests.yml">
      <img alt="Unit Tests" src="https://github.com/iamkenos/hornet/actions/workflows/unit-tests.yml/badge.svg">
  </a>
</p>

## About

Test API endpoints with [Axios](https://www.npmjs.com/package/axios) & [Jest](https://jestjs.io/) using a collection of custom [matchers](https://jestjs.io/docs/using-matchers) and built-in utility functions.

Key features:

- write tests with [TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html) and run it with [TS Jest](https://kulshekhar.github.io/ts-jest/)
- JSON schema matching
- reporters:
  - built-in jest reporter
  - [allure](https://github.com/zaqqaz/jest-allure)

## Requirements

- NodeJS ≥ 20.10.0 or ≤ LTS

## Get Started

You'll need a working knowledge of Playwright and Cucumber to be able to use this library. They have rich documentation so head on over the site and read on if you're not familiar with it yet.

1. Get it: `npm install @iamkenos/iris`

2. Setup npm scripts, add the following inside your `package.json` file:

   ```json
   "scripts": {
     "test": "jest --config jest.config.ts",
     "report": "allure open results/allure/html"
   },
   ```

3. Create a `tsconfig.json` file:

   ```json
   {
     "compilerOptions": {
       "baseUrl": "./",
       "esModuleInterop": true,
       "types": ["node", "@types/jest"]
     },
     "include": ["./**/*.ts"]
   }
   ```

4. Create your Jest config file: `jest.config.ts`

   ```ts
   import { configure } from "@iamkenos/iris/config";

   export default configure();
   ```

5. Create your spec files:

   ```ts
   // specs/public/v2/users/GET.spec.ts
   import { thenResponseSchemaEquals, thenResponseStatusEquals, whenSendRequest } from "@iamkenos/iris";
   import { givenGetUsersRequest, givenGetUsersRequestByQueryParam, REQ_METHOD_GET, REQ_PATH } from "./";

   import axios from "axios";

   describe(`[REST]: ${REQ_METHOD_GET} ${REQ_PATH}`, () => {
     it("S01A: should return details of a specific type of user: Default", async () => {
       const response = await axios<{ gender: string; status: string }[]>("https://gorest.co.in/public/v2/users", {
         method: "GET",
         params: {
           gender: "female",
           status: "active"
         }
       });

       expect(response.status).toEqual(200);
       expect(response.data.length).toBeGreaterThan(0);
       response.data.forEach((item) => {
         expect(item.gender).toEqual("female");
         expect(item.status).toEqual("active");
       });
     });

     it("S01B: should return details of a specific type of user: Abstracted", async () => {
       const request = givenGetUsersRequestByQueryParam({ gender: "female", status: "active" });
       const response = await whenSendRequest(request);

       thenResponseStatusEquals(response, 200);
       await thenResponseSchemaEquals(response, "rest/users-female-active-schema");
     });

     it("S02: should return the list of all users", async () => {
       const request = givenGetUsersRequest();
       const response = await whenSendRequest(request);

       thenResponseStatusEquals(response, 200);
       await thenResponseSchemaEquals(response, "rest/users-schema");
     });
   });

   // specs/public/v2/users/POST.spec.ts
   import {
     thenResponseBodyEquals,
     thenResponseSchemaEquals,
     thenResponseStatusEquals,
     whenSendRequest
   } from "@iamkenos/iris";
   import { givenPostUserRequest, REQ_METHOD_POST, REQ_PATH, TOKEN } from "./";

   describe(`[REST]: ${REQ_METHOD_POST} ${REQ_PATH}`, () => {
     it("S01: should require authentication", async () => {
       const request = givenPostUserRequest({
         name: "foo bar",
         email: "foo.bar@email.com",
         gender: "male",
         status: "active"
       });
       const response = await whenSendRequest(request);

       thenResponseStatusEquals(response, 401);
       thenResponseBodyEquals(response, { message: "Authentication failed" });
     });

     it("S02: should create a new user", async () => {
       const request = givenPostUserRequest(
         {
           name: "foo bar",
           email: `${Date.parse(new Date() as any)}@email.com`,
           gender: "male",
           status: "active"
         },
         { Authorization: TOKEN }
       );
       const response = await whenSendRequest(request);

       thenResponseStatusEquals(response, 201);
       await thenResponseSchemaEquals(response, "rest/user-schema");
     });
   });

   // specs/public/v2/users/index.ts
   import { givenRequest, Request } from "@iamkenos/iris";

   export const BASE_URL = "https://gorest.co.in";
   export const TOKEN = "Bearer 8ca53fe20cbc28f26c1bee2526b5543ca22dab339f5b5e0516329fcbf51530fc";
   export const REQ_PATH = "/public/v2/users";
   export const REQ_METHOD_GET = "GET";
   export const REQ_METHOD_POST = "POST";

   export type PostUserRequestBody = {
     name: string;
     email: string;
     gender: "male" | "female";
     status: "active" | "inactive";
   };

   export function givenGetUsersRequest() {
     return givenRequest(`${BASE_URL}${REQ_PATH}`, {
       method: REQ_METHOD_GET
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
   ```

6. Run it: `npm test`

7. Check the results: `npm run report`

## License

ISC

## TODO

- full UTs
- full docs
- npm init
- contrib guide
- jest extended
