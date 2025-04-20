const devRoute: RouterType.BlogRouteRecordRaw = {
  path: 'dev',
  name: 'Dev',
  meta: {
    title: '开发',
    order: 2,
    icon: 'blog-menu-dev',
  },
  children: [
    {
      path: 'format',
      name: 'Format',
      meta: {
        title: '代码格式化',
        icon: 'blog-menu-format',
        iframeUrl: 'https://highlightjs.org/demo',
      },
    },
    {
      path: 'image',
      name: 'Image',
      meta: {
        title: '代码转图片',
        icon: 'blog-menu-image',
        externalUrl: 'https://carbon.now.sh/',
      },
    },
    {
      path: 'npm',
      name: 'Npm',
      meta: {
        title: 'Npm可视化',
        icon: 'blog-menu-npm',
        iframeUrl: 'https://pkg-graph.info/',
      },
    },
  ],
}

export default devRoute
