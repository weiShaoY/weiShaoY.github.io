// import { TEST_LAYOUT } from '@/layouts'

const proTable = {
  path: '/test/proTable',
  name: 'proTable',
  redirect: '/test/proTable/useProTable',
  meta: {
    icon: 'MessageBox',
    title: '超级表格',
    isLink: '',
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: true,
  },

  children: [
    {
      path: '/test/proTable/useProTable',
      name: 'useProTable',
      component: () => import('@/pages/test/proTable/useProTable/index.vue'),
      meta: {
        icon: 'Menu',
        title: '使用 ProTable',
        isLink: '',
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: true,
      },
    },
  ],
}

export default proTable
