import { DEFAULT_LAYOUT } from '@/layouts'

/**
 *  首页路由
 */
const homeRouter: RouterType.RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: DEFAULT_LAYOUT,
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
