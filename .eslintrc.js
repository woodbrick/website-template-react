// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module'
    },
    env: {
      es6: true,
      browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    // required to lint *.vue files
    plugins: [
      "react"
    ],
    // add your custom rules here
    'rules': {
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // not allow space-before-function
      'space-before-function-paren': ["warn", "never"],
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'no-extra-semi': ["off", "always"],
      // 'semi': ["off"],
      'react/no-children-prop': ["off"],
      'no-console': ["off"]
    }
  }
  