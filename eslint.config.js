import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `.temp_tarjeta4` and `Temporal` are leftover scratch copies, not sources.
  globalIgnores(['dist', '.temp_tarjeta4', 'Temporal']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: { react },
    rules: {
      // Core ESLint does not treat JSX identifiers as references, so without
      // this every `motion`, `AnimatePresence` or lowercase component import
      // was reported as unused — about 30 false errors that made `npm run lint`
      // not worth running. Only this one rule is enabled: the plugin's full
      // recommended set would bury real findings under style noise.
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
