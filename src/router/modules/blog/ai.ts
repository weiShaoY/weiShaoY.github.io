const aiRoute: RouterType.BlogRoute = {
  path: 'ai',
  name: 'Ai',
  meta: {
    title: 'Ai',
    icon: 'blog-menu-ai',
    keepAlive: true, // 修复：父级路由也需要缓存
    order: 10,
  },
  children: [
    {
      path: 'siliconFlow',
      name: 'SiliconFlow',
      meta: {
        title: '硅基流动-Api余额查询',
        keepAlive: true,
        icon: 'blog-menu-siliconFlow',
        iframeUrl: 'https://file.sxjeru.top/misc/siliconflow.html',
      },
    },
    {
      path: 'deepSeek',
      name: 'DeepSeek',
      meta: {
        title: 'DeepSeek-Api余额查询',
        keepAlive: true,
        icon: 'blog-menu-deepSeek',
        iframeUrl: 'https://codepen.io/Heye-Jones/embed/ByaqoOZ?default-tab=result&autoplay=false',
      },
    },
  ],
}

export default aiRoute
