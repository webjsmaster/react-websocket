module.exports = {
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // project: ['./tsconfig.json', './tsconfig.node.json', './tailwind.config.js'],
    },
    root: true,
    env: {browser: true, es2021: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', '@typescript-eslint', 'eslint-plugin-react'],
    rules: {
        "max-len": ["warn", 120],
        "indent": ["warn", 4],
        // "react/jsx-indent": ["warn", 4],
        "react/forbid-prop-types": 0,
        "semi": [2, "never"],
        "no-underscore-dangle": 0,
        "no-console": 0,
        "linebreak-style": 0,
        "comma-dangle": [2, {
            "arrays": "never",
            "objects": "never",
            "imports": "never",
            "exports": "never",
            "functions": "ignore"
        }],
        "quotes": ["error", "single" ],
        "react/jsx-curly-spacing": [2, "always"],
        "object-curly-spacing": [2, "always"],
        // "bracket-spacing": [2, "always"],
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        "react/react-in-jsx-scope": "off",
    },
}
