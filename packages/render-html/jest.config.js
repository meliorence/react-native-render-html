module.exports = {
  preset: 'react-native',
  testRegex: 'src/.*(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  coveragePathIgnorePatterns: ['/node_modules/', '__tests__'],
  setupFiles: ['<rootDir>/jest/setup.js']
};
