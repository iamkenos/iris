import { givenGraphQLQueryFile, givenRequest } from "@iamkenos/iris";
import { BASE_URL } from "@specs";

export const REQ_PATH = "/public/v2/graphql";
export const REQ_METHOD = "POST";

export function givenUsersQueryRequest() {
  const query = `query {
    users {
      nodes {
        name
        email
      }
    }
  }`;

  return givenRequest(`${BASE_URL}${REQ_PATH}`, {
    method: REQ_METHOD,
    body: { query }
  });
}

export function givenUserQueryRequest(id: number) {
  const query = givenGraphQLQueryFile("fixtures/graphql/user.gql", { id });

  return givenRequest(`${BASE_URL}${REQ_PATH}`, {
    method: REQ_METHOD,
    body: query
  });
}
