import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import ajvFormats from "ajv-formats";
import fs from "fs-extra";
import path from "path";
import { MatcherState } from "@jest/expect";
import { MatcherHintOptions } from "jest-matcher-utils";

import {
  AllureAdapter,
  BufferEncoding,
  isJSON,
  MimeType
} from "@common";

expect.extend({
  // @ts-ignore
  toMatchJsonSchema(this: MatcherState, received: any, filename: string) {
    const ajv = new Ajv({ allErrors: true });
    ajvErrors(ajv);
    ajvFormats(ajv);

    const matcherName = "toMatchJsonSchema";
    const options: MatcherHintOptions = {
      comment: "json schema matching",
      isNot: this.isNot,
      promise: this.promise
    };
    const snapshot = global.iris.snapshots.schema;
    const output = JSON.stringify(isJSON(received) ? JSON.parse(received) : received);
    const actFile = path.join(snapshot.actualDir, filename) + ".json";
    const expFile = path.join(snapshot.baselineDir, filename) + ".json";
    fs.outputFileSync(actFile, output);

    const actContent = fs.readFileSync(actFile, BufferEncoding.UTF8);
    const expContent = fs.readFileSync(expFile, BufferEncoding.UTF8);
    const actual = JSON.parse(actContent);
    const expected = JSON.parse(expContent);
    const validator = ajv.compile(expected);

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
