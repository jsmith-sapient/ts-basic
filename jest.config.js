module.exports = {
  clearMocks: true,
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
  ],
  preset: 'ts-jest',
  roots: [
    './src',
  ],
  setupFilesAfterEnv: [
    './jest.setup.ts'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
