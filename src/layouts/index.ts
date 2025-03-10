/**
 *  simple 简单布局组件
 */
export const SIMPLE_Layout = () => import('./simple/index.vue')

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
export const BLOG_IFRAME_LAYOUT = () => import('./blog/iframe/index.vue')

/**
 *  blog 代码模块 external 渲染组件
 */
export const BLOG_EXTERNAL_LAYOUT = () => import('./blog/external/index.vue')



export const TEST_LAYOUT = () => import('./test/index.vue')

