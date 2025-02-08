import type { AppRouteRecordRaw } from '@/router/types'

import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const document: AppRouteRecordRaw = {
  path: 'workplace',
  name: 'Workplace',
  meta: {
    locale: '工作台',
    icon: 'blog-menu-workplace',
    hideChildrenInMenu: true,
    order: 0,
  },
  redirect: '/blog/workplace/index',
  component: BLOG_DEFAULT_LAYOUT,
  children: [
    {
      path: 'index',
      name: 'Index',
      component: () => import('@/pages/blog/workplace/index.vue'),
      meta: {
        activeMenu: 'Workplace',
      },
    },
  ],

}

export default document
