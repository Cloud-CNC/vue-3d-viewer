/**
 * @fileoverview ESlint config
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'arrow-parens': [
			'warn',
			'as-needed'
		],
		'brace-style': [
			'warn',
			'allman'
		],
		camelcase: [
			'warn',
			{
				properties: 'always'
			}
		],
		curly: 'warn',
		'no-var': 'error',
		'no-extra-semi': 'error',
		'object-curly-spacing': 'warn',
		semi: 'error',
		quotes: [
			'warn',
			'single'
		],
		'quote-props': [
			'warn',
			'as-needed'
		],
		'space-in-parens': 'warn',
		'prefer-const': 'warn'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '**/tests/e2e/**/*.{j,t}s?(x)',
      ],
      env: {
        mocha: true
      }
    }
  ]
};
