module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 7,
    sourceType: 'module',
  },
  globals: {
    document: true,
    localStorage: true,
    chrome: true,
  },
  rules: {
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'max-len': 'off',
    // 禁止使用 var
    'no-var': 'error',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-return': 'off'
  },
}
