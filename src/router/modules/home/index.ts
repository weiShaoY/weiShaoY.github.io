import type { RouteRecordRaw } from 'vue-router'

import { HOME_DEFAULT_LAYOUT } from '@/router/layout'

/**
 *  首页路由
 */
const homeRouter: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    redirect: {
      name: 'About',
    },
    component: HOME_DEFAULT_LAYOUT,
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/home/about/index.vue'),
      },
      {
        path: 'work',
        name: 'Work',
        component: () => import('@/pages/home/work/index.vue'),
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/pages/home/contact/index.vue'),
      },
    ],
  },

]

export default homeRouter
