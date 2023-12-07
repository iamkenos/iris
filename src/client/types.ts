import type { AxiosRequestConfig, AxiosResponse } from "axios";

export type Spec = { body?: any } & Partial<AxiosRequestConfig>;

export type Response = AxiosResponse<string> & {
  /** The time in ms taken to get the response */
  time: number;
  /** The request object */
  request: AxiosResponse["request"];
  /** Alias for Axios' data */
  body: AxiosResponse["data"];
};
