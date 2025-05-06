const News: RouterType.BlogRouteRecordRaw = {
  path: 'news',
  name: 'News',
  meta: {
    title: '资讯',
    icon: 'blog-menu-news',
    order: 10,
  },
  redirect: {
    name: 'DailyHotTopics',
  },
  children: [

    {
      path: 'dailyHotTopics',
      name: 'DailyHotTopics',
      meta: {
        title: '每日热点',
        icon: 'blog-menu-dailyHotTopics',
        iframeUrl: 'https://today.lieme.cn/',
      },
    },
    {
      path: 'itNews',
      name: 'ItNews',
      meta: {
        title: 'IT资讯',
        icon: 'blog-menu-itNews',
      },
      component: () => import('@/pages/blog/news/itNews/index.vue'),
    },

    {
      path: 'boxOffice',
      name: 'BoxOffice',
      meta: {
        title: '票房',
        icon: 'blog-menu-boxOffice',
      },
      component: () => import('@/pages/blog/news/boxOffice/index.vue'),
    },
    {
      path: 'weather',
      name: 'Weather',
      meta: {
        title: '天气',
        icon: 'blog-menu-weather',
      },
      component: () => import('@/pages/blog/news/weather/index.vue'),
    },

    {
      path: 'game',
      name: 'Game',
      meta: {
        title: '游戏',
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
            title: '王者荣耀',
            icon: 'blog-menu-hok',
          },
          component: () => import('@/pages/blog/news/game/hok/index.vue'),
        },
      ],
    },
    {
      path: 'price',
      name: 'Price',
      meta: {
        title: '价格',
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
            title: '黄金',
            icon: 'blog-menu-gold',
          },
          component: () => import('@/pages/blog/news/price/gold/index.vue'),
        },
        {
          path: 'oil',
          name: 'Oil',
          meta: {
            title: '燃油',
            icon: 'blog-menu-oil',
          },
          component: () => import('@/pages/blog/news/price/oil/index.vue'),
        },
        {
          path: 'cigarette',
          name: 'Cigarette',
          meta: {
            title: '香烟',
            icon: 'blog-menu-cigarette',
          },
          component: () => import('@/pages/blog/news/price/cigarette/index.vue'),
        },
      ],
    },
  ],
}

export default News
