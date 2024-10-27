import type { AppRouteRecordRaw } from '../types'

const BLOG: AppRouteRecordRaw = {
  path: 'blog',
  name: 'Blog',
  redirect: {
    name: 'aCategory',
  },
  component: () => import('@/layout/code-layout/index.vue'),
  meta: {
    locale: 'BLOG',

    // icon: 'icon-dashboard',
    order: 1,
  },
  children: [
    {
      path: 'category',
      name: 'aCategory',
      component: () => import('@/pages/code/blog/category/index.vue'),
      meta: {
        locale: '分类管理',
      },
    },
    {
      path: 'tag',
      name: 'aTag',
      component: () => import('@/pages/code/blog/tag/index.vue'),
      meta: {
        locale: '标签管理',
      },
    },
    {
      path: 'friendLink',
      name: 'aFriendLink',
      component: () => import('@/pages/code/blog/friendLink/index.vue'),
      meta: {
        locale: '友链管理',
      },
    },
    {
      path: 'article',
      name: 'aArticle',
      component: () => import('@/pages/code/blog/article/index.vue'),
      meta: {
        locale: '文章管理',
      },
    },

    {
      path: 'album',
      name: 'aAlbum',
      component: () => import('@/pages/code/blog/album/index.vue'),
      meta: {
        locale: '图库管理',
      },
      children: [
        {
          path: ':id',
          name: 'aAlbumDetail',
          component: () => import('@/pages/code/blog/album/index.vue'),
          meta: {
            locale: '相册详情',
          },
        },
      ],
    },

  ],
}

export default BLOG
