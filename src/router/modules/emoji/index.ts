import { DEFAULT_LAYOUT } from '@/layouts'

/**
 *  表情路由
 */
const emojiRouter: RouterType.RouteRecordRaw = {
  path: '/emoji',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '', // 空路径，作为默认子路由
      name: 'Emoji', // 移动 name 到子路由
      component: () => import('@/pages/emoji/index.vue'),
      meta: {
        documentTitle: '我的表情!',
      },
    },
  ],
}

export default emojiRouter
