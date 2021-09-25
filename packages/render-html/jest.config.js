module.exports = {
  ...require('../../jest-config-base'),
  setupFiles: ['<rootDir>/jest/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupAfterEnv.ts']
};
