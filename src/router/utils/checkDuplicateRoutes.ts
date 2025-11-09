import type { RouteRecordRaw } from 'vue-router'

/**
 * 检查路由配置中的重复 name 和 path
 * @param routes 路由配置数组
 * @returns 检查结果 { hasDuplicate: boolean, duplicates: { names: string[], paths: string[] } }
 * @description 检查路由配置中的重复 name 和 path，并生成警告信息
 */
function checkRouteConfigDuplicates(routes: RouteRecordRaw[]): {
  hasDuplicate: boolean
  duplicates: {
    names: string[]
    paths: string[]
  }
} {
  const nameMap = new Map<string, number>()

  const pathMap = new Map<string, number>()

  const duplicates = {
    names: [] as string[],
    paths: [] as string[],
  }

  /**
   *  递归检查单个路由及其子路由
   *  @param route 路由记录
   */
  function checkRoute(route: RouteRecordRaw) {
    // 检查重复 name（安全处理 symbol 类型）
    if (route.name) {
      const nameString = String(route.name)

      const count = nameMap.get(nameString) || 0

      nameMap.set(nameString, count + 1)

      // 只在第二次出现时添加到重复数组，避免重复添加
      if (count === 1) {
        duplicates.names.push(nameString)
      }
    }

    // 检查重复 path（忽略空路径）
    if (route.path && route.path.trim() !== '') {
      const count = pathMap.get(route.path) || 0

      pathMap.set(route.path, count + 1)

      // 只在第二次出现时添加到重复数组，避免重复添加
      if (count === 1) {
        duplicates.paths.push(route.path)
      }
    }

    // 递归检查子路由
    if (route.children) {
      route.children.forEach(child => checkRoute(child))
    }
  }

  // 执行检查
  routes.forEach(route => checkRoute(route))

  // 生成警告信息
  if (duplicates.names.length > 0 || duplicates.paths.length > 0) {
    let warningMessage = ''

    if (duplicates.names.length > 0) {
      warningMessage += `<strong>重复的路由 name:</strong><br>${duplicates.names.join('<br>')}`
    }

    if (duplicates.paths.length > 0) {
      if (warningMessage) {
        warningMessage += '<br><br>'
      }

      warningMessage += `<strong>重复的路由 path:</strong><br>${duplicates.paths.join('<br>')}`
    }

    console.warn('[路由重复警告] 发现以下重复项:', {
      names: duplicates.names,
      paths: duplicates.paths,
    })

    if (window.$messageBox) {
      window.$messageBox.alert(warningMessage, '路由重复警告', {
        dangerouslyUseHTMLString: true,
      })
    }
  }

  return {
    hasDuplicate: duplicates.names.length > 0 || duplicates.paths.length > 0,
    duplicates,
  }
}

/**
 * 延迟检查路由配置中的重复 name 和 path
 * @param routeList 路由配置数组
 * @param time 延迟时间（毫秒） 默认 3000 毫秒
 */
export function checkDuplicateRouteList(routeList: RouteRecordRaw[], time = 3000) {
/**
 * 延迟检查重复路由
 */
  setTimeout(() => {
    requestAnimationFrame(() => {
      try {
        checkRouteConfigDuplicates(routeList)

        if (window._DEV__) {
          // window.$notification.success('路由检查完成')
          window.$notification?.success({
            title: '路由检查完成!',
            message: '未发现重复路由!',
          })
        }
      }
      catch {
        window.$notification.error('路由检查失败')
      }
    })
  }, time)
}
