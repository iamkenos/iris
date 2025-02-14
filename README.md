<!-- markdownlint-disable MD033 -->
<h1 align="center">IRIS</h1>

<p align="center" width="100%">
  <a href="https://github.com/iamkenos/iris/actions/workflows/unit-tests.yml" target="_blank">
    <img src="https://img.shields.io/github/actions/workflow/status/iamkenos/iris/unit-tests.yml?label=unit%20tests&logo=github">
  </a>
  <a href="https://github.com/iamkenos/iris/actions/workflows/feature-tests.yml" target="_blank">
    <img src="https://img.shields.io/github/actions/workflow/status/iamkenos/iris/feature-tests.yml?label=feature%20tests&logo=github">
  </a>
  <br/>
  <a href="https://www.npmjs.com/package/@iamkenos/iris?activeTab=readme" target="_blank">
    <img alt="" src="https://img.shields.io/npm/v/@iamkenos/iris?label=version&logo=npm&logoColor=red&color=red">
  </a>
  <a href="https://www.npmjs.com/package/@iamkenos/iris?activeTab=readme" target="_blank">
    <img alt="" src="https://img.shields.io/npm/dm/@iamkenos/iris?label=downloads&logo=npm&logoColor=red&color=red">
  </a>
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
