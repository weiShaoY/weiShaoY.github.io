import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

/**
 * 自定义权限 Hook
 * @returns  权限相关的函数
 */
export default function usePermission() {
  // const userStore = useUserStore()

  return {
    /**
     *  检查路由是否可以访问
     *  @param  route - 路由对象
     *  @returns  是否可以访问
     */
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return !!(
        !route.meta?.roles // 没有指定角色要求的路由直接可访问
        // 包含通配角色的路由直接可访问
        || route.meta?.roles === -1
        || (typeof route.meta?.roles === 'number')
      )
    },

    /**
     *  查找第一个具有权限的路由
     *  @param  _routers - 路由列表
     *  @param  role - 用户角色
     *  @returns  第一个具有权限的路由
     */
    findFirstPermissionRoute(_routers: any, role = 'admin') {
      const cloneRouters = [..._routers]

      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()

        // 返回第一个具有权限的路由名称
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role)
          })
        ) {
          return {
            name: firstElement.name,
          }
        }

        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children)
        }
      }

      // 没有找到具有权限的路由
      return null
    },

    // 您可以添加任何其他规则
  }
}
