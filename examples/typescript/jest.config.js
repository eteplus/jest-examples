/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
 module.exports = {
  displayName: 'ChannelService',
  rootDir: __dirname,
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  testMatch: ['**/__tests__/*.spec.[jt]s?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
