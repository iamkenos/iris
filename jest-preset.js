const tsjest = require('ts-jest/jest-preset');
const preset = require('./build/config/jest/preset').default;

/**
 * can't have a preset within a preset so build it like this instead
 * @see [Jest Issue #8714](https://github.com/facebook/jest/issues/8714#issuecomment-513139087)
 * @see [TS Jest Presets](https://kulshekhar.github.io/ts-jest/docs/getting-started/presets)
 */
module.exports = Object.assign(tsjest, preset);
