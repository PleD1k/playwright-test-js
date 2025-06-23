const base = require('@playwright/test');

const extendedTest = base.test.extend({
  testIdGenerator: async ({}, use) => {
    const randomId = Math.floor(Math.random() * 999) + 1; //от 1 до 999
    console.log(`Generated test ID: ${randomId}`);
    await use(randomId);
  },
});

module.exports = {
  test: extendedTest,
  expect: base.expect,
};