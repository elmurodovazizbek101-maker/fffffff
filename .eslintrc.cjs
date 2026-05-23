module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    process: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-unused-vars': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
