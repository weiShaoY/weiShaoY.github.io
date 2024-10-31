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
    hideChildrenInMenu: true,
    order: 0,
  },

  children: [
    {
      path: 'index',
      name: 'Index',
      component: () => import('@/pages/code/workplace/index.vue'),
      meta: {
        activeMenu: 'Workplace',
      },
    },

  ],

}

export default document
