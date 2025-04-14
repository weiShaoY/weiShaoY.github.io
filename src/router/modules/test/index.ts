// {
//   path: '/test',
//   component: () => import('@/pages/test/index.vue'),
// },

import type { RouteRecordRaw } from 'vue-router'

import { TEST_BASE_LAYOUT } from '@/layouts'

/**
 *  首页路由
 */
const TestRouter: RouteRecordRaw[] = [
  {
    path: '/test',
    name: 'Test',

    // redirect: import.meta.env.VITE_ROUTER_BLOG_PATH,
    redirect: '/test/home',
    component: TEST_BASE_LAYOUT,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/test/home/index.vue'),
      },
    ],
  },

]

export default TestRouter
