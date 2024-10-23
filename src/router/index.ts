import NProgressPlugin from '@/utils/nporgress'

import { createRouter, createWebHistory } from 'vue-router'

import { appRoutes } from './routes/index'

/**
 * 导入进度条样式
 */
import 'nprogress/nprogress.css'

console.log('%c Line:6 🥤 appRoutes', 'color:#4fff4B', appRoutes)

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
        name: 'Home',
      },
    },

    // 首页
    {
      path: '/home',
      name: 'Home',
      redirect: {
        name: 'About',
      },
      component: () => import('@/pages/home/index.vue'),
      children: [
        {
          path: 'about',
          name: 'About',
          component: () => import('@/pages/home/about.vue'),
        },
        {
          path: 'resume',
          name: 'Resume',
          component: () => import('@/pages/home/resume.vue'),
        },
      ],
    },

    ...appRoutes,

    // 代码
    // {
    //   path: '/coding',
    //   name: 'Coding',
    //   component: () => import('@/pages/coding/index.vue'),
    // },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/error/403.vue'),
      meta: {
        title: '403页面',
      },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/error/404.vue'),
      meta: {
        title: '404页面',
      },
    },
    {
      path: '/500',
      name: '',
      component: () => import('@/pages/error/500.vue'),
      meta: {
        title: '500页面',
      },
    },

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/pages/error/404.vue'),
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
