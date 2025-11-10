const devRoute: RouterType.AdminRoute = {
  path: 'dev',
  name: 'Dev',
  meta: {
    title: '开发',
    order: 2,
    icon: 'admin-menu-dev',
    keepAlive: true, // 添加：确保父级路由被缓存
  },
  children: [
    {
      path: 'codeHighlighting',
      name: 'CodeHighlighting',
      meta: {
        title: '代码高亮',
        icon: 'admin-menu-codeHighlighting',
        keepAlive: true, // 添加：确保子路由被缓存
      },
      children: [
        {
          path: 'highlightJs',
          name: 'HighlightJs',
          meta: {
            title: 'HighlightJs',
            icon: 'admin-menu-highlightJs',
            iframeUrl: 'https://highlightjs.org/demo',
            keepAlive: true, // 添加：确保子路由被缓存
          },
        },
        {
          path: 'carbon',
          name: 'Carbon',
          meta: {
            title: 'Carbon',
            icon: 'admin-menu-carbon',
            externalUrl: 'https://carbon.now.sh/',
            fastMenuOrder: 3,
            keepAlive: true, // 添加：确保子路由被缓存
          },
        },
      ],
    },

    // {
    //   path: 'npm',
    //   name: 'Npm',
    //   meta: {
    //     title: 'Npm可视化',
    //     icon: 'admin-menu-npm',
    //     iframeUrl: 'https://pkg-graph.info/',
    //   },
    // },
    {
      path: 'jsonFormatter',
      name: 'JsonFormatter',
      meta: {
        title: 'Json格式化',
        icon: 'admin-menu-jsonFormatter',
        keepAlive: true, // 添加：确保路由被缓存
      },
      component: () => import('@/pages/admin/dev/jsonFormatter/index.vue'),
    },
    {
      path: 'jsonToTypeScript',
      name: 'JsonToTypeScript',
      meta: {
        title: 'Json转Ts',
        icon: 'admin-menu-jsonToTypeScript',
        fastMenuOrder: 4,
        keepAlive: true, // 添加：确保路由被缓存
      },
      component: () => import('@/pages/admin/dev/jsonToTypeScript/index.vue'),
    },

  ],
}

export default devRoute
