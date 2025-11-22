const workbench: RouterType.AdminRoute = {
  path: 'design',
  name: 'design',
  meta: {
    title: '设计工具',
    icon: 'tool-menu-design',
    order: 0,
    textBadge: 'Beta',
  },
  children: [
    {
      path: 'emoji',
      name: 'Emoji',
      component: () => import('@/pages/tool/design/emoji/index.vue'),
      meta: {
        title: 'Emoji',
        icon: 'tool-menu-design-emoji',
        order: 0,
        textBadge: 'Beta',
      },
    },
  ],

}

export default workbench
