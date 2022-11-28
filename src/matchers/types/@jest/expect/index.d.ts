/// <reference types="@jest/expect" />

/** see [this](https://github.com/facebook/jest/blob/master/packages/expect/src/types.ts#L34) */
declare module "@jest/expect" {
  // eslint-disable-next-line
  Tester = (a: any, b: any) => boolean | undefined;
  import type * as jestMatcherUtils from "jest-matcher-utils";
  export type MatcherState = {
    assertionCalls: number;
    currentTestName?: string;
    dontThrow?: () => void;
    error?: Error;
    equals: (
      a: unknown,
      b: unknown,
      customTesters?: Array<Tester>,
      strictCheck?: boolean,
      ) => boolean;
    expand?: boolean;
    expectedAssertionsNumber?: number | null;
    expectedAssertionsNumberError?: Error;
    isExpectingAssertions?: boolean;
    isExpectingAssertionsError?: Error;
    isNot: boolean;
    promise: string;
    suppressedErrors: Array<Error>;
    testPath?: Config.Path;
    utils: typeof jestMatcherUtils & {
      iterableEquality: Tester;
      subsetEquality: Tester;
    };
  };
}
