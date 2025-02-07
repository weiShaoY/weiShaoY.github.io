import type { AppRouteRecordRaw } from '@/router/types'

import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const Dev: AppRouteRecordRaw = {
  path: 'dev',
  name: 'Dev',
  redirect: {
    name: 'Clock',
  },
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    locale: '开发',
    icon: 'blog-menu-dev',
    order: 10,
  },
  children: [
    {
      path: 'format',
      name: 'Format',
      component: () => import('@/pages/blog/innovation/clock/index.vue'),
      meta: {
        locale: '代码格式化',
        icon: 'blog-menu-format',
      },
    },

  ],
}

export default Dev
