import globals from 'globals';
import js from '@eslint/js';
import typescriptLint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/**/*', '**/dist/**/*'],
  },
  js.configs.recommended,
  ...typescriptLint.configs.recommended,

  // Disable a set of rules that may conflict with prettier
  // You can safely remove this if you don't use prettier
  eslintConfigPrettier,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.tsx', '**/*.mts'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      semi: ['error', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],

      quotes: [
        'warn',
        'single',
        {
          avoidEscape: true,
        },
      ],

      'no-undef': ['error'],
    },
  },

  {
    files: ['packages/preload/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  {
    files: ['packages/renderer/**'],
    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.node).map(([key]) => [key, 'off'])),
        ...globals.browser,
      },
    },
  },

  {
    files: ['**/tests/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  {
    files: ['**/vite.config.*'],
    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, 'off'])),
        ...globals.node,
      },
    },
  },
];
