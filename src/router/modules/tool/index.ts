import { DEFAULT_LAYOUT } from '@/layouts'

/**
 *  表情路由
 */
const emojiRouter: RouterType.RouteRecordRaw = {
  path: '/tool',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '', // 空路径，作为默认子路由
      name: 'Tool', // 移动 name 到子路由
      // component: () => import('@/pages/tool/index.vue'),
      meta: {
        documentTitle: '我的表情!',
      },
    },
  ],
}

export default emojiRouter
