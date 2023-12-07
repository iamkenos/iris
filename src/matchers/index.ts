export * from "./match-json-schema";

declare global {
  namespace jest {
    /** All custom matchers should follow [jest matchers](https://github.com/facebook/jest/blob/master/packages/expect/src/matchers.ts) format */
    // eslint-disable-next-line
    interface Matchers<R> {
      toMatchJsonSchema: (filename: string) => Promise<R>;
    }
  }
}
