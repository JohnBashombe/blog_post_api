module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testRegex: '(/tests/.*|(\\./)(test|spec))\\.(js|ts)x?$',
  transform: {
    '^.+\\.(js|ts)x?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'node',
  clearMocks: true,
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'src/app.js',
    'src/server.js',
    'dist/',
    'src/database/config/config.js',
    'src/database/models/index.js',
    'src/database/migrations',
  ],
};
