export const REQ_ENDPOINT = "/users";
export const REQ_METHOD = "POST";

export type PostUserRequestBody = {
  name: string;
  age?: string;
  job?: string;
};

export type PostUserResponseBody = {
  name: string;
  id: string;
  job?: string
  age?: string;
  createdAt: string;
};
