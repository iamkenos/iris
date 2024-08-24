/** @see [RecursivePartial](https://stackoverflow.com/a/51365037/2285470) */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export type Intersect<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type KeyValuePair = { key: string; value: string };

export type MergeTuple<A extends any[], B extends any[]> = [...A, ...B];

export type Constructor<T> = new (...args: any) => T;

/** @see[Exactify](https://github.com/microsoft/TypeScript/issues/12936#issuecomment-368244671) */
export type ExcludePropertiesOf<X extends T, T> = T & { [K in keyof X]: K extends keyof T ? X[K] : never };

/** @see [Nested Omit](https://stackoverflow.com/a/78575949) */
export type NestedOmit<Schema, Path extends string> = Path extends `${infer Head}.${infer Tail}`
  ? Head extends keyof Schema
    ? {
        [K in keyof Schema]: K extends Head ? NestedOmit<Schema[K], Tail> : Schema[K];
      }
    : Schema
  : Omit<Schema, Path>;
