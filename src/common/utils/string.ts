import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  noCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase
} from "change-case";

export function isURL(str: string) {
  try {
    const url = new URL(str);
    return url.href.replace(/([^:]\/)\/+/g, "$1");
  } catch (e) {
    return false;
  }
}

export function isJSON(str: string) {
  if (typeof str !== "string") return false;
  try {
    const result = JSON.parse(str);
    return result instanceof Array || result instanceof Object;
  } catch (e) {
    return false;
  }
}

export function parseJSON(object: any) {
  try {
    return JSON.parse(object);
  } catch (e) {
    return object;
  }
}

export const changecase = {
  /** Convert a string to camel case (`fooBar`). */
  camelCase,
  /** Convert a string to capital case (`Foo Bar`). */
  capitalCase,
  /** Convert a string to constant case (`FOO_BAR`). */
  constantCase,
  /** Convert a string to dot case (`foo.bar`). */
  dotCase,
  /** Convert a string to kebab case (`foo-bar`). */
  kebabCase: (input: string) => noCase(input).replace(new RegExp(/ /, "g"), "-"),
  /** Convert a string to space separated lower case (`foo bar`). */
  noCase,
  /** Convert a string to pascal case (`FooBar`). */
  pascalCase,
  /** Convert a string to path case (`foo/bar`). */
  pathCase,
  /** Convert a string to path case (`Foo bar`). */
  sentenceCase,
  /** Convert a string to snake case (`foo_bar`). */
  snakeCase,
  /** Split any cased input strings into an array of words. */
  split: (input: string) => noCase(input).split(" ")
};
