module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'max-len': ['error', {
            code: 100,
            tabWidth: 2,
            ignoreUrls: true,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }],
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'object-curly-spacing': ['error','always'],
        'comma-dangle': ['error', 'never'],
        'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
        'no-void': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
        'global-require': 'off',
        'valid-jsdoc': ['error', {
            prefer: {
                arg: 'param',
                argument: 'param',
                returns: 'return'
            },
            preferType: {
                Boolean: 'boolean',
                Number: 'number',
                object: 'Object',
                String: 'string'
            },
            requireParamDescription: false,
            requireReturnDescription: false
        }],
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            },
            {
                selector: 'LabeledStatement',
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
            },
            {
                selector: 'WithStatement',
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
            }
        ],
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
        'react/forbid-prop-types': 'off',
        'react/no-children-prop': 'off',
        'import/no-dynamic-require': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'import/prefer-default-export': 'off',
        'object-curly-newline': 'off',
        'function-paren-newline': 'off',
        'flowtype/no-types-missing-file-annotation': 'off',
        'template-curly-spacing' : 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
    }
};
