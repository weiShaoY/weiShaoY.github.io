import { defineConfig } from 'vitepress' // 导入 VitePress 的 defineConfig 函数，用于定义站点配置

// https://vitepress.dev/reference/site-config

export default defineConfig({ // 导出默认配置对象，使用 defineConfig 函数包裹
  base: '/docs/',
  title: 'docs', // 设置站点的标题
  description: 'A VitePress Site', // 设置站点的描述，用于 SEO

  themeConfig: { // 配置主题相关的内容
    // https://vitepress.dev/reference/default-theme-config
    nav: [ // 配置导航栏，显示在页面顶部
      // {
      //   text: 'Home', // 导航链接的文字
      //   link: '/', // 导航链接的目标 URL，这里指向根目录
      // },
      {
        text: 'Examples', // 导航链接的文字
        link: '/markdown-examples', // 导航链接的目标 URL，这里指向 markdown-examples 页面
      },
    ],

    sidebar: [ // 配置侧边栏，显示在页面左侧（或根据屏幕尺寸显示在其他位置）
      {
        text: 'Examples', // 侧边栏分组的标题
        items: [ // 侧边栏分组中的链接项
          {
            text: 'Markdown Examples', // 链接项的文字
            link: '/markdown-examples', // 链接项的目标 URL，这里指向 markdown-examples 页面
          },
          {
            text: 'Runtime API Examples', // 链接项的文字
            link: '/api-examples', // 链接项的目标 URL，这里指向 api-examples 页面
          },
        ],
      },
    ],

    socialLinks: [ // 配置社交链接，通常显示在页面底部或导航栏
      {
        icon: 'github', // 社交链接的图标，这里使用 GitHub 图标
        link: 'https://github.com/vuejs/vitepress', // 社交链接的目标 URL，这里指向 VitePress 的 GitHub 仓库
      },
    ],
  },
})
