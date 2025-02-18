import type { AppRouteRecordRaw } from '@/router/types'

import {
  BLOG_DEFAULT_LAYOUT,
  BLOG_IFRAME_LAYOUT,
} from '@/layouts'

const News: AppRouteRecordRaw = {
  path: 'news',
  name: 'News',
  meta: {
    locale: '资讯',
    icon: 'blog-menu-news',
    order: 10,
  },
  redirect: {
    name: 'DailyHotTopics',
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [

    {
      path: 'dailyHotTopics',
      name: 'DailyHotTopics',
      meta: {
        locale: '每日热点',
        icon: 'blog-menu-dailyHotTopics',
        iframeUrl: 'https://today.lieme.cn/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    {
      path: 'movie',
      name: 'Movie',
      meta: {
        locale: '电影',
        icon: 'blog-menu-movie',
      },
      component: import('@/pages/blog/news/movie/index.vue'),
    },
    {
      path: 'weather',
      name: 'Weather',
      meta: {
        locale: '天气',
        icon: 'blog-menu-weather',
      },
      component: import('@/pages/blog/news/weather/index.vue'),
    },

    {
      path: 'game',
      name: 'Game',
      meta: {
        locale: '游戏',
        icon: 'blog-menu-game',
      },
      redirect: {
        name: 'Hok',
      },
      children: [
        {
          path: 'hok',
          name: 'Hok',
          meta: {
            locale: '王者荣耀',
            icon: 'blog-menu-hok',
          },
          component: import('@/pages/blog/news/game/hok/index.vue'),
        },
      ],
    },
    {
      path: 'price',
      name: 'Price',
      meta: {
        locale: '价格',
        icon: 'blog-menu-price',
      },
      redirect: {
        name: 'Gold',
      },
      children: [
        {
          path: 'gold',
          name: 'Gold',
          meta: {
            locale: '黄金',
            icon: 'blog-menu-gold',
          },
          component: import('@/pages/blog/news/price/gold/index.vue'),
        },
        {
          path: 'oil',
          name: 'Oil',
          meta: {
            locale: '燃油',
            icon: 'blog-menu-oil',
          },
          component: import('@/pages/blog/news/price/oil/index.vue'),
        },
        {
          path: 'cigarette',
          name: 'Cigarette',
          meta: {
            locale: '香烟',
            icon: 'blog-menu-cigarette',
          },
          component: import('@/pages/blog/news/price/cigarette/index.vue'),
        },
      ],
    },
  ],
}

export default News
