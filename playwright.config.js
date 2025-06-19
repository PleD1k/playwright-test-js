require('dotenv').config();

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  globalSetup: './global-setup.js',
  use: {
    baseURL: process.env.BASE_URL,
  },
  projects: [
    {
      name: 'setup-problem',
      testMatch: /global-setup\.js/,
    },
    {
      name: 'problem-tests',
      dependencies: ['setup-problem'],
      use: {
        storageState: 'problem-user-state.json',
      },
    },
  ],
});