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
      //  强制执行第一个属性的位置
      'vue/first-attribute-linebreak': [
        'warn',
        {
          singleline: 'below',
          multiline: 'below',
        },
      ],

      //  强制每行的最大属性数
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],

      // 强制在多行元素的内容之前和之后进行换行。
      'vue/multiline-html-element-content-newline': [
        'warn',
        {
          ignoreWhenEmpty: true, // 忽略空元素
          allowEmptyLines: true, // 允许空行
        },
      ],

      // vue 单行元素内容换行
      'vue/singleline-html-element-content-newline': [
        'warn',
        {
          // 强制内容换行，即使没有属性
          ignoreWhenNoAttributes: false,
        },
      ],

      // 要求或禁止模板中同级标签之间的换行符
      'vue/padding-line-between-tags': [
        'warn',
        [
          {
            blankLine: 'always',
            prev: '*',
            next: '*',
          },
        ],
      ],

      // 强制要求每个 prop 都有一个记录它的注释。
      'vue/require-prop-comment': [
        'warn',
        {
          type: 'JSDoc',
        },
      ],

      'vue/block-tag-newline': [
        'warn',
        {
          singleline: 'always', // 单行标签后需要换行
          multiline: 'always', // 多行标签后也需要换行
          maxEmptyLines: 1, // 设置空行的最大数量为 1
        },
      ],

    },
  },

  typescript: {
    overrides: {

      // 强制链式调用（chained calls）在每次调用后换行
      'newline-per-chained-call': 'warn',

      // 是否禁止使用 alert
      'no-alert': 'off',

      // 是否禁止使用 console
      'no-console': 'off',

      // 强制块的括号样式一致
      // 'brace-style': [
      //   'warn',
      //   '1tbs',
      //   { allowSingleLine: false },
      // ],

      // 空行最多不能超过 3 行
      // 'no-multiple-empty-lines': ['error', { max: 3 }],

      // 是否禁止使用禁止 process
      'node/prefer-global/process': 'off',

      // 强制将对象属性放在单独的行上
      'object-property-newline': 'warn',

      // 强制在开括号后和闭括号前使用一致的换行符
      'object-curly-newline': [
        'warn',
        {
          // 多行导入时保持默认的换行习惯
          ImportDeclaration: { multiline: true, minProperties: 3 },
          ExportDeclaration: { multiline: true, minProperties: 1 },
          ObjectExpression: 'always',
          ObjectPattern: { multiline: true },
        },

      ],

      // 强制使用一致的换行风格
      'curly': 'warn',

      // 行注释位置
      // 'line-comment-position': ['warn', { position: 'above' }],

      // 强制在注释中 // 或 /* 使用一致的空行  beforeBlockComment  在块注释之前  beforeLineComment  在行注释之前
      'lines-around-comment': [
        'warn',
        {
          beforeBlockComment: true, // beforeBlockComment: 在块注释之前
          beforeLineComment: true, // beforeLineComment: 在行注释之前
          allowBlockStart: true, // allowBlockStart: 允许块注释开始
          allowObjectStart: true, // allowObjectStart: 允许对象开始
          allowArrayStart: true, // allowArrayStart: 允许数组开始
          ignorePattern: 'eslint|jshint|jslint|istanbul|global|exported|jscs|组件|弹窗', // ignorePattern: 忽略的模式
        },
      ],

      // 在特定语句之前和之后添加空行
      'padding-line-between-statements': [
        'warn',
        {
          blankLine: 'always',
          prev: [
            'const',
            'let',
            'var',
            'block',
            'block-like',
            'import',
            'export',
            'class',
            'try',
            'return',
          ],
          next: '*',
        },
      ],

      // 强制所有的对象类型定义使用 type
      'ts/consistent-type-definitions': ['warn', 'type'],

      // 强制块的填充
      // 'padded-blocks': [
      //   'error',
      //   'always',
      // ],

      // 在注释中的 // 或 /*后面强制保持一致的间距
      'spaced-comment': [
        'warn',
        'always',
        {
          markers: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'], // markers: 必须要有空格
        },
      ],

      //  要求三元表达式始终使用多行格式，除了在 JSX 中忽略此规则
      'style/multiline-ternary': [
        'warn',
        'always-multiline',
        { ignoreJSX: true },
      ],

      // 'max-statements-per-line': [
      //   'warn',
      //   {
      //     max: 1,
      //   },
      // ],
      'max-statements-per-line': 'off',

    },

  },

})