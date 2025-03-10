const aaa = {
  path: '/test/workbench',
  name: 'Workbench',
  component: () => import('@/pages/test/workbench/index.vue'),
  meta: {
    icon: 'HomeFilled',
    title: '工作台',
    isLink: '',
    isHide: false,
    isFull: false,
    isAffix: true,
    isKeepAlive: true,
  },

}

export default aaa
