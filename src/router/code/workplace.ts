import type { AppRouteRecordRaw } from '../types'

const document: AppRouteRecordRaw = {
  path: 'workplace',
  name: 'Workplace',

  redirect: '/code/workplace/index',

  component: () => import('@/layout/code-layout/index.vue'),
  meta: {
    locale: '工作台',
    icon: 'wenDang',
    isStandaloneMenu: true,
    order: 0,
  },

  children: [
    {
      path: 'index',
      name: 'Index',
      component: () => import('@/pages/code/workplace/index.vue'),
    },

  ],

}

export default document
