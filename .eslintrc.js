module.exports = {
  extends: ['airbnb'],
  installedESLint: true,
  plugins: ['react'],
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: 'babel-eslint',
  rules: {
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-named-default': 'off',
    'import/no-named-default': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
};
