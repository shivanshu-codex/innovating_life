import js          from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import a11yPlugin  from 'eslint-plugin-jsx-a11y';
import globals     from 'globals';

export default [
  js.configs.recommended,
  {
    files:   ['**/*.{js,jsx}'],
    plugins: {
      react:          reactPlugin,
      'react-hooks':  hooksPlugin,
      'jsx-a11y':     a11yPlugin,
    },
    languageOptions: {
      globals:       { ...globals.browser, ...globals.es2022 },
      parserOptions: { ecmaVersion: 2022, ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/jsx-uses-react':                      'off',
      'react/react-in-jsx-scope':                  'off',
      'react/prop-types':                          'warn',
      'react/no-unknown-property':                 'error',
      'react-hooks/rules-of-hooks':                'error',
      'react-hooks/exhaustive-deps':               'warn',

      'jsx-a11y/alt-text':                         'error',
      'jsx-a11y/aria-props':                       'error',
      'jsx-a11y/aria-role':                        'error',
      'jsx-a11y/interactive-supports-focus':       'error',
      'jsx-a11y/click-events-have-key-events':     'error',
      'jsx-a11y/no-static-element-interactions':   'error',
      'jsx-a11y/anchor-is-valid':                  'error',
      'jsx-a11y/label-has-associated-control':     'error',

      'no-console':     ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-var':         'error',
      'prefer-const':   'error',
      'eqeqeq':         ['error', 'always'],
    },
  },
  {
    files: ['tests/**', '**/*.test.{js,jsx}'],
    rules: { 'no-unused-vars': 'warn' },
  },
];
