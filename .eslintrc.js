module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', "plugin:vue/recommended"],
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
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src/'], //别名路径
        ],
      },
    },
  },
  rules: {
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'class-methods-use-this':'off',
    'no-useless-escape':'off',
    'no-async-promise-executor':'off',
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
    'no-useless-return': 'off',
    'vue/no-v-html': 'off',
    'vue/no-template-shadow': 'off',
  },
}
