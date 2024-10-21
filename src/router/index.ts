import NProgressPlugin from '@/utils/nporgress'

import { createRouter, createWebHistory } from 'vue-router'

/**
 * 导入进度条样式
 */
import 'nprogress/nprogress.css'

/**
 * 创建并配置路由器
 */
const router = createRouter({

  /**
   *    路由模式
   */
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Index',
      },
    },

    // 首页
    {
      path: '/index',
      name: 'Index',
      redirect: {
        name: 'About',
      },
      component: () => import('@/pages/index/index.vue'),
      children: [
        {
          path: 'about',
          name: 'About',
          component: () => import('@/pages/index/about.vue'),
        },
        {
          path: 'resume',
          name: 'Resume',
          component: () => import('@/pages/index/resume.vue'),
        },
      ],
    },

    // 代码
    {
      path: '/coding',
      name: 'Coding',
      component: () => import('@/pages/coding/index.vue'),
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/pages/404/index.vue'),
    },

    // ...appRoutes,

    // REDIRECT_MAIN,

    // NOT_FOUND_ROUTE,
  ],

  /**
   *  每次路由切换时滚动到页面顶部
   */
  scrollBehavior() {
    return { top: 0 }
  },
})

// beforeEach路由切换之前触发
router.beforeEach(() => {
  // 开始进度条
  NProgressPlugin.start()
})

// afterEach路由切换之后触发
router.afterEach(() => {
  // 结束进度条
  NProgressPlugin.close()
})

export default router
