/**
 *  home 首页模块默认布局组件
 */
export const HOME_DEFAULT_LAYOUT = () => import('./home/index.vue')

/**
 * blog 代码模块默认布局组件
 */
export const BLOG_DEFAULT_LAYOUT = () => import('./blog/index.vue')

/**
 *  blog 代码模块 iframe 渲染组件
 */
export const BLOG_IFRAME_LAYOUT = () => import('./blog/components/iframe/index.vue')

/**
 *  simple 简单布局组件
 */
export const SIMPLE_Layout = () => import('./simple/index.vue')
