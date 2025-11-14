import { DEFAULT_LAYOUT } from '@/layouts'

/**
 *  测试页面路由
 */
const testRouter: RouterType.RouteRecordRaw = {
  path: '/test',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '', // 空路径，作为默认子路由
      name: 'Test', // 移动 name 到子路由
      component: () => import('@/pages/test/index.vue'),
      meta: {
        documentTitle: '测试',
      },
    },
  ],
}

export default testRouter
