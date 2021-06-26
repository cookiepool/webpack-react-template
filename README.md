# webpack-react-template
Webpack + React + React-Router + Sass + ESLint With Prettier + lint-staged With husky

- Webbpack
  - [webpack](https://webpack.js.org/)

- React
  - [react](https://reactjs.org/)

- React-Router
  - [react-router](https://reactrouter.com/)

- Sass(Scss)

- ESLint + Prettier
  - [eslint](http://eslint.cn/)
  - [prettier](https://prettier.io/)
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
  - [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
  - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
  - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

  对应代码：
  ```
  // .eslintrc.js
  module.exports = {
    root: true,
    env: {
      node: true
    },
    plugins: ['react', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended'
    ],
    globals: {
      document: 'readonly'
    },
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module',
      ecmaVersion: 2020
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, // 使用单引号
          arrowParens: 'always', // 箭头函数始终包含圆括号
          endOfLine: 'auto', // 自动识别换行是LF还是CRLF，默认prettier是LF
          trailingComma: 'none' // 最后不需要逗号
        }
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    // 针对eslint-plugin-react的配置，详见：https://github.com/yannickcr/eslint-plugin-react#configuration
    settings: {
      react: {
        version: 'detect'
      }
    }
  };

  ```
  > endOfLine的官方文档的解释：[链接地址](https://prettier.io/docs/en/options.html#end-of-line)

  > trailingComma：[链接地址](https://prettier.io/docs/en/options.html#trailing-commas)

  VSCode设置里面加入保存文件时自动修复
  ```
  "editor.codeActionsOnSave": {"source.fixAll": true}
  ```
  
- lint-staged + husky
  - [lint-staged](https://github.com/okonet/lint-staged)
  - [husky](https://github.com/typicode/husky/)
  
  > 注意：husky 6 + lint-staged 11的使用方式跟前面的版本不再一样，老的配置方式不再适用，建议使用lint-staged的官方命令来自动安装相关配置，执行命令` npx mrm@2 lint-staged `，执行这个命令前请保证已配置了正确的ESLint。
  > 本模板为husky 4 + lint-staged 9





