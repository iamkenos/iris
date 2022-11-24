const { configure } = require('../build/config');
const { pathsToModuleNameMapper: tspaths } = require('ts-jest');
const { compilerOptions: options } = require('./tsconfig');

module.exports = configure({
  moduleNameMapper: tspaths(options.paths, { prefix: '<rootDir>' }),
});

