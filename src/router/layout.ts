/**
 *  home 首页模块默认布局组件
 */
export const HOME_DEFAULT_LAYOUT = () => import('@/layout/home-layout/index.vue')

/**
 * blog 代码模块默认布局组件
 */
export const BLOG_DEFAULT_LAYOUT = () => import('@/layout/blog-layout/index.vue')

/**
 *  blog 代码模块 iframe 渲染组件
 */
export const BLOG_IFRAME_LAYOUT = () => import('@/layout/blog-layout/components/iframe/index.vue')

/**
 *  simple 简单布局组件
 */
export const SIMPLE_Layout = () => import('@/layout/simple-layout/index.vue')
