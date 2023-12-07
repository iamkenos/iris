import axios from "axios";

import type { Response, Spec } from "@client";

export class Request {
  private url: string;
  private delay = { pre: 0, post: 0 };
  public readonly spec: Spec;

  constructor(url: string, spec?: Spec) {
    this.url = url;
    this.spec = { url: this.url, validateStatus: () => true, ...spec, data: spec.body } as any;
  }

  public setPreDelay(ms: number) {
    this.delay.pre = ms;
    return this;
  }

  public setPostDelay(ms: number) {
    this.delay.post = ms;
    return this;
  }

  public async send() {
    await new Promise(resolve => setTimeout(resolve, this.delay.pre));
    let response: Response;
    try {
      /** measure response time in nanos with [`process.hrtime.bigint()`](https://nodejs.org/api/process.html#process_process_hrtime_bigint) */
      const start = process.hrtime.bigint();
      response = await axios(this.url, this.spec) as Response;
      response.time = Math.round(Number(process.hrtime.bigint() - start) / 1000000);
      response.request = this.spec;
      response.body = response.data;
    } catch (err) {
      console.error(`Fetch ${this.url} returned an error.`, err);
      throw err;
    }
    await new Promise(resolve => setTimeout(resolve, this.delay.post));
    return response;
  }
}
