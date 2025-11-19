rules: {
        ...pluginVue.configs.base.rules as any, // 从 Vue 插件的基础配置中引入规则，并强制类型为 any

        ...vueVersion === 2 // 根据 Vue 版本号判断使用 Vue 2 还是 Vue 3 的规则
          ? {
              ...pluginVue.configs['vue2-essential'].rules as any, // 引入 Vue 2 的 essential 规则，并强制类型为 any
              ...pluginVue.configs['vue2-strongly-recommended'].rules as any, // 引入 Vue 2 的 strongly-recommended 规则，并强制类型为 any
              ...pluginVue.configs['vue2-recommended'].rules as any, // 引入 Vue 2 的 recommended 规则，并强制类型为 any
            }
          : {
              ...pluginVue.configs['flat/essential'].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}) as any, // 引入 Vue 3 的 essential 规则，并强制类型为 any
              ...pluginVue.configs['flat/strongly-recommended'].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}) as any, // 引入 Vue 3 的 strongly-recommended 规则，并强制类型为 any
              ...pluginVue.configs['flat/recommended'].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}) as any, // 引入 Vue 3 的 recommended 规则，并强制类型为 any
            },

        'antfu/no-top-level-await': 'off', // 关闭 antfu 插件的 no-top-level-await 规则
        'node/prefer-global/process': 'off', // 关闭 node 插件的 prefer-global/process 规则
        'ts/explicit-function-return-type': 'off', // 关闭 ts 插件的 explicit-function-return-type 规则

        'vue/block-order': ['error', { // 配置 Vue 模板中的 block 顺序
          order: ['script', 'template', 'style'], // 指定 script, template, style 块的顺序
        }],
        'vue/component-name-in-template-casing': ['error', 'PascalCase'], // 强制 Vue 组件在模板中使用 PascalCase 命名
        'vue/component-options-name-casing': ['error', 'PascalCase'], // 强制 Vue 组件 options 的名称使用 PascalCase 命名
        // this is deprecated
        'vue/component-tags-order': 'off', // 关闭 vue/component-tags-order 规则，因为该规则已弃用
        'vue/custom-event-name-casing': ['error', 'camelCase'], // 强制 Vue 自定义事件名称使用 camelCase 命名
        'vue/define-macros-order': ['error', { // 配置 Vue 3 中 defineMacros 的顺序
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'], // 指定 defineOptions, defineProps, defineEmits, defineSlots 的顺序
        }],
        'vue/dot-location': ['error', 'property'], // 强制点号的位置在属性上
        'vue/dot-notation': ['error', { allowKeywords: true }], // 强制使用点号表示法，允许使用关键字
        'vue/eqeqeq': ['error', 'smart'], // 强制使用严格相等运算符，使用 smart 模式
        'vue/html-indent': ['error', indent], // 强制 HTML 缩进
        'vue/html-quotes': ['error', 'double'], // 强制 HTML 属性使用双引号
        'vue/max-attributes-per-line': 'off', // 关闭 vue/max-attributes-per-line 规则
        'vue/multi-word-component-names': 'off', // 关闭 vue/multi-word-component-names 规则
        'vue/no-dupe-keys': 'off', // 关闭 vue/no-dupe-keys 规则
        'vue/no-empty-pattern': 'error', // 禁止使用空模式
        'vue/no-irregular-whitespace': 'error', // 禁止使用不规则的空白
        'vue/no-loss-of-precision': 'error', // 禁止丢失精度的数字字面量
        'vue/no-restricted-syntax': [ // 限制使用的语法
          'error',
          'DebuggerStatement', // 禁止使用 debugger 语句
          'LabeledStatement', // 禁止使用 LabeledStatement 语句
          'WithStatement', // 禁止使用 WithStatement 语句
        ],
        'vue/no-restricted-v-bind': ['error', '/^v-/'], // 禁止使用以 v- 开头的 v-bind 指令
        'vue/no-setup-props-reactivity-loss': 'off', // 关闭 vue/no-setup-props-reactivity-loss 规则
        'vue/no-sparse-arrays': 'error', // 禁止稀疏数组
        'vue/no-unused-refs': 'error', // 禁止未使用的 refs
        'vue/no-useless-v-bind': 'error', // 禁止无用的 v-bind 指令
        'vue/no-v-html': 'off', // 关闭 vue/no-v-html 规则
        'vue/object-shorthand': [ // 强制对象简写
          'error',
          'always', // 总是使用简写
          {
            avoidQuotes: true, // 避免引号
            ignoreConstructors: false, // 不忽略构造函数
          },
        ],
        'vue/prefer-separate-static-class': 'error', // 建议将静态类名提取出来
        'vue/prefer-template': 'error', // 建议使用模板字符串
        'vue/prop-name-casing': ['error', 'camelCase'], // 强制 prop 名称使用 camelCase 命名
        'vue/require-default-prop': 'off', // 关闭 vue/require-default-prop 规则
        'vue/require-prop-types': 'off', // 关闭 vue/require-prop-types 规则
        'vue/space-infix-ops': 'error', // 强制中缀运算符周围有空格
        'vue/space-unary-ops': ['error', { nonwords: false, words: true }], // 强制一元运算符周围有空格

        ...stylistic // 根据 stylistic 变量的值判断是否启用样式相关的规则
          ? {
              'vue/array-bracket-spacing': ['error', 'never'], // 强制数组括号内不留空格
              'vue/arrow-spacing': ['error', { after: true, before: true }], // 强制箭头函数的箭头前后有空格
              'vue/block-spacing': ['error', 'always'], // 强制块级代码块前后有空格
              'vue/block-tag-newline': ['error', { // 强制块级标签换行
                multiline: 'always', // 多行时总是换行
                singleline: 'always', // 单行时总是换行
              }],
              'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }], // 强制大括号风格，使用 stroustrup 风格，允许单行
              'vue/comma-dangle': ['error', 'always-multiline'], // 强制多行时逗号结尾
              'vue/comma-spacing': ['error', { after: true, before: false }], // 强制逗号后有空格，逗号前没有空格
              'vue/comma-style': ['error', 'last'], // 强制逗号风格为 last
              'vue/html-comment-content-spacing': ['error', 'always', { // 强制 HTML 注释内容周围有空格
                exceptions: ['-'], // 排除 '-'
              }],
              'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }], // 强制键值对冒号后有空格，冒号前没有空格
              'vue/keyword-spacing': ['error', { after: true, before: true }], // 强制关键字前后有空格
              'vue/object-curly-newline': 'off', // 关闭 vue/object-curly-newline 规则
              'vue/object-curly-spacing': ['error', 'always'], // 强制对象大括号内有空格
              'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }], // 强制对象属性换行，允许所有属性在同一行
              'vue/operator-linebreak': ['error', 'before'], // 强制运算符换行，使用 before 模式
              'vue/padding-line-between-blocks': ['error', 'always'], // 强制块之间有空行
              'vue/quote-props': ['error', 'consistent-as-needed'], // 强制属性引号，使用 consistent-as-needed 模式
              'vue/space-in-parens': ['error', 'never'], // 强制括号内不留空格
              'vue/template-curly-spacing': 'error', // 强制模板字符串花括号内有空格
            }
          : {},

        ...a11y // 根据 a11y 变量的值判断是否启用 a11y 相关的规则
          ? {
              'vue-a11y/alt-text': 'error', // 强制 img 标签有 alt 属性
              'vue-a11y/anchor-has-content': 'error', // 强制 a 标签有内容
              'vue-a11y/aria-props': 'error', // 强制使用正确的 aria 属性
              'vue-a11y/aria-role': 'error', // 强制使用正确的 aria role
              'vue-a11y/aria-unsupported-elements': 'error', // 禁止在不支持 aria 属性的元素上使用 aria 属性
              'vue-a11y/click-events-have-key-events': 'error', // 强制 click 事件有 key 事件
              'vue-a11y/form-control-has-label': 'error', // 强制 form 控件有 label
              'vue-a11y/heading-has-content': 'error', // 强制 heading 标签有内容
              'vue-a11y/iframe-has-title': 'error', // 强制 iframe 标签有 title 属性
              'vue-a11y/interactive-supports-focus': 'error', // 强制交互元素支持 focus
              'vue-a11y/label-has-for': 'error', // 强制 label 标签有 for 属性
              'vue-a11y/media-has-caption': 'warn', // 建议 media 标签有 caption
              'vue-a11y/mouse-events-have-key-events': 'error', // 强制 mouse 事件有 key 事件
              'vue-a11y/no-access-key': 'error', // 禁止使用 access key
              'vue-a11y/no-aria-hidden-on-focusable': 'error', // 禁止在可 focus 元素上使用 aria-hidden
              'vue-a11y/no-autofocus': 'warn', // 建议不要使用 autofocus
              'vue-a11y/no-distracting-elements': 'error', // 禁止使用会让人分心的元素
              'vue-a11y/no-redundant-roles': 'error', // 禁止使用冗余的 role
              'vue-a11y/no-role-presentation-on-focusable': 'error', // 禁止在可 focus 元素上使用 role="presentation"
              'vue-a11y/no-static-element-interactions': 'error', // 禁止在静态元素上使用交互
              'vue-a11y/role-has-required-aria-props': 'error', // 强制 role 有必需的 aria 属性
              'vue-a11y/tabindex-no-positive': 'warn', // 建议 tabindex 不要使用正数
            }
          : {},

        ...overrides, // 应用 overrides 配置
      },
    },
