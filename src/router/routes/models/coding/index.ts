import type { AppRouteRecordRaw } from '../model'

const Coding: AppRouteRecordRaw = {
  path: '/coding',
  name: 'Coding',
  component: () => import('@/pages/coding/index.vue'),
  meta: {
    locale: '博客',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1,
    roles: -1,
  },

  // children: [
  //   {
  //     path: 'category',
  //     name: 'Category',
  //     component: () => import('@/pages/blog/category/index.vue'),
  //     meta: {
  //       locale: '分类管理',
  //       requiresAuth: true,
  //       roles: -1,
  //     },
  //   },

  // ],
}

export default Coding
