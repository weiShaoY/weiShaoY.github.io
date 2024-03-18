import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignores: [
      '**/components.d.ts',
      '**/dist/**',
      '**/iconFont.js',
    ],
  },
)
