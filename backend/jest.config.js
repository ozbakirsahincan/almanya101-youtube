export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'routes/**/*.js',
    'middleware/**/*.js',
    'utils/**/*.js',
    'config/**/*.js',
    '!**/node_modules/**'
  ],
  verbose: true,
  forceExit: true,
  detectOpenHandles: true,
  transform: {},
  testTimeout: 30000
};
