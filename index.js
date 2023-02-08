module.exports = {

  extends: [
      'eslint:recommended',
      'plugin:import/recommended',
      'plugin:json/recommended',
      'plugin:jsdoc/recommended',
      'plugin:n/recommended',
      'plugin:promise/recommended',
  ],

  // We rely on "top level await", an ES2022 feature, introduced in Node.js 16.12.0 .
  // Contrary to documentation, this must be set BOTH in env and parserOptions.

  env: {
    es2022: true,
    node: true,
    jest: true,
  },

  parserOptions: {
    // assume import/export
    sourceType: 'module',
    ecmaVersion: '2022',
  },

  plugins: [
    'import',
    'jsdoc',
    'json',
    'n', // NodeJS
    'promise',
  ],

  settings: {
    jsdoc: {
      mode: 'typescript',
    }
  },

  reportUnusedDisableDirectives: true,

  rules: {

    ///////////////////////////////////////////////////////////////////////////
    // RULES WHICH EVERYBODY ENABLES
    // These rules are not enabled in eslint-config-recommended.
    // However, Google, StandardJS, and SKNUPS all agree to enable these rules.
    ///////////////////////////////////////////////////////////////////////////

    // Suggestions

    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-multi-str': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error',
    'no-var': 'error',
    'prefer-const': ['error', {'destructuring': 'all'}],
    'prefer-promise-reject-errors': 'error',

    // Layout & Formatting

    'array-bracket-spacing': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'eol-last': 'error',
    'func-call-spacing': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'no-multi-spaces': 'error',
    'no-tabs': 'error',
    'rest-spread-spacing': 'error',
    'semi-spacing': 'error',
    'space-before-blocks': 'error',

    ///////////////////////////////////////////////////////////////////////////
    // RULES WHERE WE AGREE WITH GOOGLE
    // These rules are not included in eslint-config-recommended.
    // Google (but not StandardJS) have explicitly enabled them, and we agree.
    ///////////////////////////////////////////////////////////////////////////

    // Suggestions

    'new-cap': 'error',
    'no-invalid-this': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',

    // Layout & Formatting

    'arrow-parens': 'error',
    'linebreak-style': 'error',
    'semi': 'error',
    'switch-colon-spacing': 'error',

    ///////////////////////////////////////////////////////////////////////////
    // RULES WHERE WE AGREE WITH STANDARDJS
    // These rules are not included in eslint-config-recommended.
    // StandardJS (but not Google) have explicitly enabled them, and we agree.
    ///////////////////////////////////////////////////////////////////////////

    // Possible Problem

    'array-callback-return': 'error',
    'no-constant-condition': ['error', {'checkLoops': false}],
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'use-isnan': ['error', {'enforceForSwitchCase': true, 'enforceForIndexOf': true}],
    'valid-typeof': ['error', { 'requireStringLiterals': true }],

    // Suggestions

    'accessor-pairs': 'error',
    'curly': ['error', 'multi-line'],
    'default-case-last': 'error',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    'no-case-declarations': 'error',
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    'no-eval': 'error',
    'no-floating-decimal': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-mixed-operators': ['error', {
      'groups': [
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof']
      ],
      'allowSamePrecedence': true
    }],
    'no-new': 'error',
    'no-new-func': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-return-assign': ['error'],
    'no-sequences': 'error',
    'no-undef-init': 'error',
    'no-unneeded-ternary': ['error', { 'defaultAssignment': false }],
    'no-unused-expressions': ['error', {
      'allowShortCircuit': true,
      'allowTernary': true,
      'allowTaggedTemplates': true
    }],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'object-shorthand': ['warn', 'properties'],
    'one-var': ['error', { 'initialized': 'never' }],
    'prefer-regex-literals': ['error', { 'disallowRedundantWrapping': true }],
    'spaced-comment': ['error', 'always', {
      'line': {
        'markers': ['*package', '!', '/', ',', '=']
      },
      'block': {
        'balanced': true,
        'markers': ['*package', '!', ',', ':', '::', 'flow-include'],
        'exceptions': ['*']
      }
    }],
    'symbol-description': 'error',
    'yoda': 'error',

    // Layout & Formatting

    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'dot-location': ['error', 'property'],
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'multiline-ternary': ['error', 'always-multiline'],
    'new-parens': 'error',
    'no-extra-parens': ['error', 'functions'],
    'no-whitespace-before-property': 'error',
    'object-curly-newline': ['error', { 'multiline': true, 'consistent': true }],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error',
    'unicode-bom': ['error', 'never'],

    ///////////////////////////////////////////////////////////////////////////
    // RULES WHERE WE AGREE WITH STANDARDJS
    // These rules are not included in eslint-config-recommended.
    // Both StandardJS and Google have explicitly enabled them,
    // but with dissimilar configuration.
    // We agree with the configuration stipulated by StandardJS.
    ///////////////////////////////////////////////////////////////////////////

    'block-spacing': 'error',
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'generator-star-spacing': ['error', 'both'],
    'operator-linebreak': ['error', 'after', { 'overrides': { '?': 'before', ':': 'before', '|>': 'before' } }],
    'space-before-function-paren': 'error',
    'yield-star-spacing': ['error', 'both'],

    ///////////////////////////////////////////////////////////////////////////
    // RULES WHERE SKNUPS STANDS ALONE
    // These rules are included in eslint-config-recommended.
    // We disable these, unlike Google and StandardJS.
    ///////////////////////////////////////////////////////////////////////////

    'no-inner-declarations': 'off',

    ///////////////////////////////////////////////////////////////////////////
    // RULES WHERE SKNUPS STANDS ALONE
    // These rules are not included in eslint-config-recommended.
    // We enable these, with configuration matching neither Google nor StandardJS.
    ///////////////////////////////////////////////////////////////////////////

    // Possible Problems

    'no-new-native-nonconstructor': 'error',
    'no-promise-executor-return': 'error',
    'no-unused-private-class-members': 'error',
    'no-unused-vars': ['warn', {
      'args': 'none',
      'varsIgnorePattern': '^_',
    }],

    // Suggestions

    'camelcase': ['error', { 'properties': 'never', 'ignoreGlobals': true }],
    'consistent-return': 'error',
    'no-nested-ternary': 'error',
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'no-restricted-syntax': ['error', 'ForInStatement'],
    'quote-props': ['error', 'consistent-as-needed'],

    // Layout & Formatting

    'comma-dangle': ['error', {
      'arrays': 'only-multiline',
      'objects': 'only-multiline',
      'imports': 'only-multiline',
      'exports': 'only-multiline',
      'functions': 'never'
    }],
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'ignoredNodes': ['TemplateLiteral *'],
      'offsetTernaryExpressions': true,
    }],
    'no-trailing-spaces': 'warn',
    'quotes': ['error', 'single'],
    'wrap-iife': ['error', 'outside', { 'functionPrototypeMethods': true }],

    ////////////////////////////////////////////////////////////////////////////
    // PLUGINS
    ////////////////////////////////////////////////////////////////////////////

    'import/no-deprecated': 'warn',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-amd': 'error',
    'import/no-commonjs': 'error',
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-named-default': 'error',
    'import/no-namespace': 'error',
    'import/no-unassigned-import': 'error',
    'import/order': 'error',

    'n/no-path-concat': 'error',

    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',

    "jsdoc/no-undefined-types": ['warn', {
      "definedTypes": [
        "RegExpMatchArray"
      ]
    }],
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-property-description': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-jsdoc': ['error', {
      'publicOnly': true,
    }],

  },

};
