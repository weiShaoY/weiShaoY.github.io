import type { RouteRecordRaw } from 'vue-router'

/**
 *  homeRouter (首页路由)
 */
const homeRouter: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    redirect: {
      name: 'About',
    },
    component: () => import('@/pages/home/index.vue'),
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/home/about.vue'),
      },
      {
        path: 'resume',
        name: 'Resume',
        component: () => import('@/pages/home/resume.vue'),
      },
    ],
  },

]

export default homeRouter
