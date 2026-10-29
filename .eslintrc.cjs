module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:sonarjs/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'prettier', 'react-refresh', 'sonarjs', 'import', 'eslint-plugin-react-compiler'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react-refresh/only-export-components': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react-compiler/react-compiler': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-console': 'error',
    'sonarjs/no-duplicate-string': 'off',
    'react/display-name': 'off',
    'import/no-default-export': ['error'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'function-expression',
      },
    ],
  },
  overrides: [
    {
      files: ['vite.config.ts', 'tailwind.config.ts', 'postcss.config.js', 'build-stats.ts'],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
  settings: {
    react: { version: 'detect' },
  },
};
