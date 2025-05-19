const devRoute: WxChatType.BlogRouteRecordRaw = {
  path: 'dev',
  name: 'Dev',
  meta: {
    title: '开发',
    order: 2,
    icon: 'blog-menu-dev',
  },
  children: [
    {
      path: 'codeHighlighting',
      name: 'CodeHighlighting',
      meta: {
        title: '代码高亮',
        icon: 'blog-menu-codeHighlighting',
      },
      children: [
        {
          path: 'highlightJs',
          name: 'HighlightJs',
          meta: {
            title: 'HighlightJs',
            icon: 'blog-menu-highlightJs',
            iframeUrl: 'https://highlightjs.org/demo',
          },
        },
        {
          path: 'carbon',
          name: 'Carbon',
          meta: {
            title: 'Carbon',
            icon: 'blog-menu-carbon',
            externalUrl: 'https://carbon.now.sh/',
            fastMenuOrder: 3,
          },
        },
      ],
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
    {
      path: 'jsonFormatter',
      name: 'JsonFormatter',
      meta: {
        title: 'Json格式化',
        icon: 'blog-menu-jsonFormatter',
      },
      component: () => import('@/pages/blog/dev/jsonFormatter/index.vue'),
    },
    {
      path: 'jsonToTypeScript',
      name: 'JsonToTypeScript',
      meta: {
        title: 'Json转Ts',
        icon: 'blog-menu-jsonToTypeScript',
        fastMenuOrder: 4,
      },
      component: () => import('@/pages/blog/dev/jsonToTypeScript/index.vue'),
    },
  ],
}

export default devRoute
