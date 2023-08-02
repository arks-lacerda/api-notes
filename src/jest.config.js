module.exports = {
  bail: true,
  coverageProvider: 'v8',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  testMatch: ['<rootDir>/src/**/*.spec.js', '<rootDir>/src/**/*.spec.jsx'],
};
