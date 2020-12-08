const path = require('path');

module.exports = {
    root: true,
    plugins: ['prettier', 'react', 'react-hooks', 'import', 'sonarjs'],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:sonarjs/recommended',
    ],
    env: {
        es6: true,
        node: false,
    },
    ignorePatterns: ['./node_modules', './package.json', './package-lock.json'],
    rules: {
        'no-inner-declarations': 'off',
        'semi': 'error',
        'space-infix-ops': 'error',
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                singleQuote: true,
                printWidth: 140,
                quoteProps: 'consistent',
            },
        ],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/react-in-jsx-scope': 'error',
        'react-hooks/exhaustive-deps': 'error',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            plugins: ['@typescript-eslint'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: [path.resolve(__dirname, './tsconfig.json')],
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:import/typescript',
            ],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
                '@typescript-eslint/no-enum': 'off',
                '@typescript-eslint/no-namespace': 'off',
                '@typescript-eslint/no-non-null-assertion': 'error',
                'no-restricted-syntax': [
                    'error',
                    {
                        selector: 'TSEnumDeclaration',
                        message: "Don't use enums. Use union type instead.",
                    },
                ],
            },
        },
        {
            files: ['./sample/**/*.ts', './sample/**/*.tsx'],
            parserOptions: {
                tsconfigRootDir: path.resolve(__dirname, './sample'),
                project: [path.resolve(__dirname, './sample/tsconfig.json')],
            },
        },
        {
            files: ['.eslintrc.js', 'webpack.config.js', 'rollup.config.js'],
            env: {
                node: true,
            },
        },
    ],
};
