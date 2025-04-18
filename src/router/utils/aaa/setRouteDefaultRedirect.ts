/**
 *  设置路由默认重定向
 *  @param routes - 路由数组
 */
export function setRouteDefaultRedirect(routes: any[]): any[] {
  // Helper function to recursively set default redirect
  function setRedirect(route: any): any {
    const newRoute = {
      ...route,
    } // Create a shallow copy to avoid mutating the original route

    if (newRoute.children && newRoute.children.length > 0) {
      if (!newRoute.redirect) {
        newRoute.redirect = newRoute.children[0].path // Set redirect to the first child's path
      }

      // Recursively process the children
      newRoute.children = newRoute.children.map(setRedirect)
    }

    return newRoute
  }

  // Return a new array of routes with default redirects set
  return routes.map(setRedirect)
}
