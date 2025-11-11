import { defineConfig } from 'vitepress'

// 从 ./theme 目录中导入自定义主题

// import DefaultTheme from 'vitepress/theme'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  // extends: DefaultTheme,

  outDir: '../dist/blog',

  // 网站基础路径
  base: '/blog/',

  // 网站标题
  title: 'weiShaoY',

  // 网站描述
  description: 'A VitePress Site',

  // 主题和默认语言
  lang: 'zh-CN',

  // 启用深色模式
  appearance: 'dark',

  // 开启代码行号
  markdown: {
    lineNumbers: true,
  },

  head: [
    // 添加图标
    ['link', {
      rel: 'icon',
      href: '/favicon.ico',
    }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // 修正logo配置
    logo: '/svgs/logo.svg',

    // siteTitle: '/../../', // 向上两级到项目根目录

    nav: [

      {
        text: '简介',
        link: '/',
      },

      {
        text: '网络',
        link: '/network/surge/configuration',
      },
    ],

    sidebar: [
      {
        text: 'Linux',
        items: [
          {
            text: '常用命令汇总',
            link: '/linux/commands',
          },

        ],
      },
      {
        text: '网络',
        items: [
          {
            text: 'Surge',
            items: [
              {
                text: '配置文件',
                link: '/network/surge/configuration',
              },
            ],
          },
        ],
      },

      // {
      //   text: 'MySQL',
      //   items: [
      //     {
      //       text: '极客时间MySql实战45讲',
      //       collapsed: true,
      //       items: [
      //         {
      //           text: '1',
      //           link: '/mysql/geekTime/01.md',
      //         },
      //         {
      //           text: '2',
      //           link: '/mysql/geekTime/02.md',
      //         },
      //         {
      //           text: '3',
      //           link: '/mysql/geekTime/03.md',
      //         },
      //         {
      //           text: '4',
      //           link: '/mysql/geekTime/04.md',
      //         },
      //         {
      //           text: '5',
      //           link: '/mysql/geekTime/05.md',
      //         },
      //         {
      //           text: '6',
      //           link: '/mysql/geekTime/06.md',
      //         },
      //         {
      //           text: '7',
      //           link: '/mysql/geekTime/07.md',
      //         },
      //         {
      //           text: '8',
      //           link: '/mysql/geekTime/08.md',
      //         },
      //         {
      //           text: '9',
      //           link: '/mysql/geekTime/09.md',
      //         },
      //         {
      //           text: '10',
      //           link: '/mysql/geekTime/10.md',
      //         },
      //         {
      //           text: '11',
      //           link: '/mysql/geekTime/11.md',
      //         },
      //         {
      //           text: '12',
      //           link: '/mysql/geekTime/12.md',
      //         },
      //         {
      //           text: '13',
      //           link: '/mysql/geekTime/13.md',
      //         },
      //         {
      //           text: '14',
      //           link: '/mysql/geekTime/14.md',
      //         },
      //         {
      //           text: '15',
      //           link: '/mysql/geekTime/15.md',
      //         },
      //         {
      //           text: '16',
      //           link: '/mysql/geekTime/16.md',
      //         },
      //         {
      //           text: '17',
      //           link: '/mysql/geekTime/17.md',
      //         },
      //         {
      //           text: '18',
      //           link: '/mysql/geekTime/18.md',
      //         },
      //         {
      //           text: '19',
      //           link: '/mysql/geekTime/19.md',
      //         },
      //         {
      //           text: '20',
      //           link: '/mysql/geekTime/20.md',
      //         },
      //         {
      //           text: '21',
      //           link: '/mysql/geekTime/21.md',
      //         },
      //         {
      //           text: '22',
      //           link: '/mysql/geekTime/22.md',
      //         },
      //         {
      //           text: '23',
      //           link: '/mysql/geekTime/23.md',
      //         },
      //         {
      //           text: '24',
      //           link: '/mysql/geekTime/24.md',
      //         },
      //         {
      //           text: '25',
      //           link: '/mysql/geekTime/25.md',
      //         },
      //         {
      //           text: '26',
      //           link: '/mysql/geekTime/26.md',
      //         },
      //         {
      //           text: '27',
      //           link: '/mysql/geekTime/27.md',
      //         },
      //         {
      //           text: '28',
      //           link: '/mysql/geekTime/28.md',
      //         },
      //         {
      //           text: '29',
      //           link: '/mysql/geekTime/29.md',
      //         },
      //         {
      //           text: '30',
      //           link: '/mysql/geekTime/30.md',
      //         },
      //         {
      //           text: '31',
      //           link: '/mysql/geekTime/31.md',
      //         },
      //         {
      //           text: '32',
      //           link: '/mysql/geekTime/32.md',
      //         },
      //         {
      //           text: '33',
      //           link: '/mysql/geekTime/33.md',
      //         },
      //         {
      //           text: '34',
      //           link: '/mysql/geekTime/34.md',
      //         },
      //         {
      //           text: '35',
      //           link: '/mysql/geekTime/35.md',
      //         },
      //         {
      //           text: '36',
      //           link: '/mysql/geekTime/36.md',
      //         },
      //         {
      //           text: '37',
      //           link: '/mysql/geekTime/37.md',
      //         },
      //         {
      //           text: '38',
      //           link: '/mysql/geekTime/38.md',
      //         },
      //         {
      //           text: '39',
      //           link: '/mysql/geekTime/39.md',
      //         },
      //         {
      //           text: '40',
      //           link: '/mysql/geekTime/40.md',
      //         },
      //         {
      //           text: '41',
      //           link: '/mysql/geekTime/41.md',
      //         },
      //         {
      //           text: '42',
      //           link: '/mysql/geekTime/42.md',
      //         },
      //         {
      //           text: '43',
      //           link: '/mysql/geekTime/43.md',
      //         },
      //         {
      //           text: '44',
      //           link: '/mysql/geekTime/44.md',
      //         },
      //         {
      //           text: '45',
      //           link: '/mysql/geekTime/45.md',
      //         },

      //       ],
      //     },
      //   ],
      // },

    ],

    // 右上角的社交图标
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/weiShaoY',
      },
    ],

    // 侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',

    // 返回顶部文字修改(移动端)
    returnToTopLabel: '返回顶部',

    // 搜索配置
    search: {
      // 本地搜索
      provider: 'local',
    },

    // 大纲显示2-3级标题
    outline: {
      level: [2, 3, 4, 5],
      label: '当前页大纲',
    },

    // 自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },
})
