// 我有一个models 文件夹, 里面分为不同的子文件夹,  文件夹可能有多层  文件夹里又有不同的md文件,

// 帮我写个函数, 获取 这些md文件的内容 为一个数组
const list = [
  {
    // linux 文件夹
    // 文件夹名称
    name: 'linux 文件夹名',
    children: [
      {
        name: 'linux 第一个 md 文件名 例如 test.md',

        content: 'linux 第一个 md 文件内容',
      },
    ],
  },
  {
    // windows 文件夹
    // 文件夹名称
    name: 'windows 文件夹名',
    children: [
      {
        name: 'windows 第一个 md 文件名 例如 test.md',

        content: 'windows 第一个 md 文件内容',
      },
    ],

  },

  // 多层文件夹
  {
    name: '多层文件夹',
    children: [
      {
        name: '子文件夹',
        children: [
          {
            name: '子文件夹中的 md 文件名 例如 test.md',

            content: '子文件夹中的 md 文件内容',
          },
        ],
      },
    ],
  },
]
