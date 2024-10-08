<!-- markdownlint-disable MD033 -->
<h1 align="center">IRIS</h1>

<!-- TODO: CHANGE THIS -->
<p align="center">
  <img alt="Unit Tests" src="https://github.com/iamkenos/iris/actions/workflows/unit-tests.yml/badge.svg">
  <img alt="Feature Tests" src="https://github.com/iamkenos/iris/actions/workflows/feature-tests.yml/badge.svg">
  <br/>
  <img alt="" src="https://img.shields.io/npm/v/@iamkenos/iris?style=flat-square">
  <img alt="" src="https://img.shields.io/npm/dm/@iamkenos/iris?style=flat-square">
</p>

## About

Test API endpoints with [Axios](https://www.npmjs.com/package/axios) & [Jest](https://jestjs.io/) using a collection of custom [matchers](https://jestjs.io/docs/using-matchers) and built-in utility functions.

Key features:

- write tests with [TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html) and run it with [TS Jest](https://kulshekhar.github.io/ts-jest/)
- JSON schema matching
- reporters:
  - built-in jest reporter
  - [allure](https://github.com/zaqqaz/jest-allure)

## Requirements

- NodeJS ≥ 20.10.0 or ≤ LTS

## Get Started

You'll need a working knowledge of Jest and Axios to be able to use this library. They have rich documentation so head on over the site and read on if you're not familiar with it yet.

1. Get it: `npm install @iamkenos/iris`

2. Run it: `npx iris init` and follow the prompt instructions.

3. Check the results: `npm run report`

## License

ISC

## Todo

- Unit Tests
- Full documentation
- Contributing guide
