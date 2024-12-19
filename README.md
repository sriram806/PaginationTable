// Import necessary plugins and configurations
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'

export default tseslint.config({
  languageOptions: {
    // Configure the TypeScript parser options
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  settings: {
    // Set the React version explicitly
    react: { version: '18.3' },
  },
  plugins: {
    // Add the React and Prettier plugins
    react,
    prettier,
  },
  rules: {
    // Enable recommended React rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,

    // Add some stylistic rules for consistency
    'prettier/prettier': 'warn',

    // Example additional rules for type safety
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Example rule to enforce consistent indentation
    'react/jsx-indent': ['error', 2],
  },
})
