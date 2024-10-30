import type { AppRouteRecordRaw } from '@/router/types'

import { CODE_DEFAULT_LAYOUT } from '@/router/layout'

const document: AppRouteRecordRaw = {
  path: 'workplace',
  name: 'Workplace',
  redirect: '/code/workplace/index',
  component: CODE_DEFAULT_LAYOUT,
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
