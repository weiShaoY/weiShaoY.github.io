/**
 *  simple 简单布局组件
 */
export const SIMPLE_Layout = () => import('./simple/index.vue')

/**
 *  首页模块默认布局组件
 */
export const HOME_DEFAULT_LAYOUT = () => import('./home/index.vue')

/**
 *  首页模块默认布局组件
 */
export const BLOG_BASE_LAYOUT = () => import('./blog/base/index.vue')

/**
 *  博客 模块 iframe 渲染组件
 */
export const BLOG_IFRAME_LAYOUT = () => import('./blog/iframe/index.vue')

/**
 *  博客 模块 external 渲染组件
 */
export const BLOG_EXTERNAL_LAYOUT = () => import('./blog/external/index.vue')
