import type { AppRouteRecordRaw } from '@/router/types'

import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const Test: AppRouteRecordRaw = {
  path: 'test',
  name: 'Test',
  meta: {
    locale: '测试',
    icon: 'blog-menu-test',
    order: 99,
  },
  redirect: {
    name: 'Api',
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [

    {
      path: 'api',
      name: 'Api',
      meta: {
        locale: '接口',
        icon: 'blog-menu-api',
      },
      component: () => import('@/pages/blog/test/api/index.vue'),
    },
    {
      path: 'component',
      name: 'Component',
      meta: {
        locale: '组件',
        icon: 'blog-menu-component',
      },
      component: () => import('@/pages/blog/test/component/index.vue'),
    },

  ],
}

export default Test
