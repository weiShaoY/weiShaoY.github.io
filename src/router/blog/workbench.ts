import type { AppRouteRecordRaw } from '@/router/types'

import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const document: AppRouteRecordRaw = {
  path: 'workbench',
  name: 'Workbench',
  meta: {
    locale: '工作台',
    icon: 'blog-menu-workbench',
    hideChildrenInMenu: true,
    order: 0,
  },
  redirect: {
    name: 'WorkbenchIndex',
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [
    {
      path: 'index',
      name: 'WorkbenchIndex',
      component: () => import('@/pages/blog/workbench/index.vue'),
      meta: {
        activeMenu: 'Workbench',
      },
    },
  ],

}

export default document
