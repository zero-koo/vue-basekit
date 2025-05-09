import js from '@eslint/js'
import vueConfigPrettier from '@vue/eslint-config-prettier'
import vueConfigTypescript from '@vue/eslint-config-typescript'
import prettier from 'eslint-plugin-prettier/recommended'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    rules: {
      ...vueConfigTypescript.rules,
      ...vueConfigPrettier.rules,
    },
  },
  prettier,
  {
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'es5',
          importOrder: [
            '^(vue/(.*)$)|^(vue$)',
            '<THIRD_PARTY_MODULES>',
            '',
            '^types$',
            '^@/lib/(.*)$',
            '^@/composables/(.*)$',
            '^@/components/ui/(.*)$',
            '^@/components/(.*)$',
            '',
            '^[./]',
          ],
          importOrderSeparation: true,
          importOrderSortSpecifiers: true,
          plugins: ['@ianvs/prettier-plugin-sort-imports'],
        },
      ],
    },
  },
])
