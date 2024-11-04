// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: true,
  ignores: [
    '**/components.d.ts',
    '**/dist/**',
    '**/iconFont.js',
    '**/assets/**',
  ],

  vue: {
    overrides: {

    },
  },

  typescript: {
    overrides: {

    },
  },

  rules: {
    'max-statements-per-line': [
      'error',
      {
        max: 1,
      },
    ],

  },
})
