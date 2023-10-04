module.exports = {
    globals: {
        window: true,
        document: true,
    },
    env: {
        browser: false,
        es2021: true,
        node: true,
    },
    extends: [
        'next',
        'next/core-web-vitals', // Para proyectos de Next.js
        'plugin:react/recommended', // Para proyectos de React
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js'],
    plugins: ['react', '@typescript-eslint'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        '@next/next/no-img-element': 'off',
        'jsx-a11y/alt-text': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',

        indent: 'off',
    },
}
