/** @type {import('ts-jest').JestConfigWithTsJest} */
import tsJestPreset from 'ts-jest'

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};