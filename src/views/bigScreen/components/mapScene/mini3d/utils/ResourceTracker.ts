import {
  Material,
  Object3D,
  Texture,
} from 'three'

/**
 * 可销毁资源类型
 */
type DisposableResource = Object3D | Material | Texture | { dispose: () => void }

/**
 * 资源追踪器类
 * @description 用于追踪和管理Three.js资源的生命周期
 * @description 自动追踪对象、材质、贴图等资源的依赖关系
 * @description 提供统一的资源销毁接口，防止内存泄漏
 * @description 支持递归追踪复杂对象结构
 */
export class ResourceTracker {
  /**
   * 资源集合
   * @description 存储所有需要追踪的资源
   */
  public resources = new Set<DisposableResource>()

  /**
   * 构造函数
   */
  constructor() {}

  /**
   * 追踪资源
   * @description 递归追踪资源及其所有依赖项
   * @description 自动处理对象、材质、贴图等资源的追踪
   * @description 支持数组形式的资源集合
   * @param resource - 要追踪的资源
   * @returns 返回原始资源
   */
  track(resource: any): any {
    if (!resource) {
      return resource
    }

    // 处理数组形式的资源（如材质数组、贴图数组等）
    if (Array.isArray(resource)) {
      resource.forEach(item => this.track(item))
      return resource
    }

    // 添加资源到追踪集合（排除Scene类型）
    if (resource.type !== 'Scene' && (resource.dispose || resource instanceof Object3D)) {
      this.resources.add(resource)
    }

    // 处理Object3D对象
    if (resource instanceof Object3D) {
      this.track((resource as any).geometry)
      this.track((resource as any).material)
      this.track(resource.children)
    }

    // 处理Material对象
    else if (resource instanceof Material) {
      // 检查材质上的所有贴图
      for (const value of Object.values(resource)) {
        if (value instanceof Texture) {
          this.track(value)
        }
      }

      // 检查uniforms中的贴图引用
      if ((resource as any).uniforms) {
        for (const value of Object.values((resource as any).uniforms)) {
          if (value) {
            const uniformValue = (value as any).value

            if (uniformValue instanceof Texture || Array.isArray(uniformValue)) {
              this.track(uniformValue)
            }
          }
        }
      }
    }

    return resource
  }

  /**
   * 取消追踪资源
   * @description 从追踪集合中移除指定资源
   * @param resource - 要取消追踪的资源
   */
  untrack(resource: DisposableResource): void {
    this.resources.delete(resource)
  }

  /**
   * 销毁所有追踪的资源
   * @description 遍历所有追踪的资源并执行销毁操作
   * @description 自动处理对象从父级移除、资源销毁等操作
   * @description 包含错误处理，确保即使部分资源销毁失败也能继续
   */
  dispose(): void {
    try {
      // 遍历所有追踪的资源
      for (const resource of this.resources) {
        // 如果是Object3D对象，先从父级移除
        if (resource instanceof Object3D) {
          if (resource.parent) {
            resource.parent.remove(resource)
          }
        }

        // 执行资源销毁
        if ((resource as any).dispose) {
          // 特殊处理某些类型的资源
          if ((resource as any).type === 1009) {
            (resource as any).dispose()
          }

          (resource as any).dispose()
        }

        // 执行清理操作（如果存在）
        if ((resource as any).clear) {
          (resource as any).clear()
        }
      }

      // 清空资源集合
      this.resources.clear()
    }
    catch (error) {
      console.log('资源销毁过程中发生错误:', error)
    }
  }
}
