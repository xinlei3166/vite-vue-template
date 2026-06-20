import { defineConfig } from 'vite-plus'

export default defineConfig({
  fmt: {
    printWidth: 100,
    semi: false,
    singleQuote: true,
    proseWrap: 'never',
    arrowParens: 'avoid',
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'ignore',
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    trailingComma: 'none',
    vueIndentScriptAndStyle: false,
    embeddedLanguageFormatting: 'auto',
    sortPackageJson: true,
    sortImports: {
      newlinesBetween: false,
      groups: [
        'type-import',
        ['value-builtin', 'value-external'],
        'package-scoped',
        'type-internal',
        'value-internal',
        ['type-parent', 'type-sibling', 'type-index'],
        ['value-parent', 'value-sibling', 'value-index'],
        'unknown'
      ],
      customGroups: [
        {
          groupName: 'package-scoped',
          elementNamePattern: ['@packages/**']
        }
      ]
    },
    ignorePatterns: [
      'dist',
      'public',
      'node_modules',
      'iconfont.js',
      'packages/docs/.vitepress/cache',
      'components.d.ts'
    ]
  },
  lint: {
    plugins: ['typescript', 'vue'],
    categories: {
      correctness: 'warn'
    },
    env: {
      builtin: true
    },
    rules: {
      'no-var': 'error',
      'no-unused-vars': 'warn',
      'vite-plus/prefer-vite-plus-imports': 'error'
    },
    ignorePatterns: [
      'dist',
      'public',
      'node_modules',
      'iconfont.js',
      'packages/docs/.vitepress/cache',
      'components.d.ts'
    ],
    options: {
      typeAware: true,
      typeCheck: true
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin'
      }
    ]
  }
})
