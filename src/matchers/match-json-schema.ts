import fs from "fs-extra";
import path from "path";

import $RefParser from "@apidevtools/json-schema-ref-parser";
import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import ajvFormats from "ajv-formats";

import type { Config } from "../config/types";
import type { MatcherState } from "@jest/expect";
import type { MatcherHintOptions } from "jest-matcher-utils";

import {
  AllureAdapter,
  BufferEncoding,
  isJSON,
  MimeType
} from "@common";

expect.extend({
  // @ts-ignore
  async toMatchJsonSchema(this: MatcherState, received: any, filename: string) {
    const ajv = new Ajv({ allErrors: true });
    ajvErrors(ajv);
    ajvFormats(ajv);

    const matcherName = "toMatchJsonSchema";
    const options: MatcherHintOptions = {
      comment: "json schema matching",
      isNot: this.isNot,
      promise: this.promise
    };
    const snapshot = global.iris.snapshots.schema as Config["globals"]["iris"]["snapshots"]["schema"];
    const output = JSON.stringify(isJSON(received) ? JSON.parse(received) : received);
    const actFile = path.join(snapshot.actualDir, filename) + ".json";
    const expFile = path.join(snapshot.expectedDir, filename) + ".json";
    fs.outputFileSync(actFile, output);

    const actContent = fs.readFileSync(actFile, BufferEncoding.UTF8);
    const expContent = fs.readFileSync(expFile, BufferEncoding.UTF8);
    const actual = JSON.parse(actContent);
    const expected = JSON.parse(expContent);
    const canRead = /^schema:\/\//i;
    const customResolver = {
      canRead,
      /** see: [custom resolvers](https://apitools.dev/json-schema-ref-parser/docs/plugins/resolvers.html) */
      read(file) {
        const uri = path.join(snapshot.expectedDir, file.url.replace(canRead, ""));
        const content = fs.readFileSync(uri);
        return content;
      }
    };
    // we need the dereferencer because ajv doesn't support local $refs out of the box
    const schema = await $RefParser.dereference(expected, { resolve: { schema: customResolver }});
    const validator = ajv.compile(schema);

    const pass = validator(actual);
    const errors = validator.errors?.map((e) => {
      return {
        field: e.instancePath,
        value: e.data,
        message: e.message
      };
    });

    const message = pass
      ? () =>
        this.utils.matcherHint(matcherName, undefined, undefined, options) +
        "\n\n" +
        `Expected: not ${this.utils.RECEIVED_COLOR(JSON.stringify(expected, null, 2))}\n` +
        `Received:     ${this.utils.EXPECTED_COLOR(JSON.stringify(actual, null, 2))}`
      : () =>
        this.utils.matcherHint(matcherName, undefined, undefined, options) +
        "\n\n" +
        `Schema mismatch: ${this.utils.RECEIVED_COLOR(JSON.stringify(errors, null, 2))}\n` +
        `Expected: ${this.utils.EXPECTED_COLOR(JSON.stringify(expected, null, 2))}\n` +
        `Received: ${this.utils.RECEIVED_COLOR(JSON.stringify(actual, null, 2))}`;

    if (!pass && !this.isNot) {
      AllureAdapter.reporter().addAttachment(`Actual: ${actFile}`, JSON.stringify(actual, null, 2), MimeType.APP_JSON);
      AllureAdapter.reporter().addAttachment(`Expected: ${actFile}`, JSON.stringify(expected, null, 2), MimeType.APP_JSON);
    }
    return { actual: received, expected, message, name: matcherName, pass };
  }
});
