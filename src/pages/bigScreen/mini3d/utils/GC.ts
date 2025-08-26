import type {
  Material,
  Object3D,
} from 'three'

/**
 * 材质销毁函数
 * @description 递归销毁材质及其相关资源
 * @description 支持单个材质和材质数组的销毁
 * @description 自动处理材质的贴图资源
 * @param material - 要销毁的材质或材质数组
 */
function materialDispose(material: Material | Material[]): void {
  if (Array.isArray(material)) {
    material.forEach(materialDispose)
  }
  else {
    // 销毁材质的贴图
    if ((material as any).map && typeof (material as any).map.dispose === 'function') {
      (material as any).map.dispose()
    }

    // 销毁材质本身
    if (typeof (material as any).dispose === 'function') {
      (material as any).dispose()
    }
  }
}

/**
 * 对象销毁函数
 * @description 递归销毁Three.js对象及其所有子对象
 * @description 自动处理几何体、材质、贴图等资源的销毁
 * @description 防止内存泄漏，确保资源正确释放
 * @param obj - 要销毁的Three.js对象
 */
function deallocate(obj: Object3D): void {
  // 销毁几何体
  if ((obj as any).geometry && typeof (obj as any).geometry.dispose === 'function') {
    (obj as any).geometry.dispose()
  }

  // 销毁材质
  if ((obj as any).material) {
    materialDispose((obj as any).material)
  }

  // 销毁贴图
  if ((obj as any).texture && typeof (obj as any).texture.dispose === 'function') {
    (obj as any).texture.dispose()
  }

  // 递归销毁子对象
  if (obj.children) {
    obj.children.forEach(deallocate)
  }
}

/**
 * 清空对象函数
 * @description 清空Three.js对象的所有子对象
 * @description 在移除子对象的同时销毁相关资源
 * @description 避免直接清空children数组，确保资源正确释放
 * @param obj - 要清空的Three.js对象
 */
function emptyObject(obj: Object3D): void {
  if (obj && obj.children) {
    // 使用while循环确保所有子对象都被移除和销毁
    while (obj.children.length) {
      const childObj = obj.children[0]

      // 从父对象中移除子对象
      obj.remove(childObj)

      // 销毁子对象及其资源
      deallocate(childObj)
    }
  }
}

/**
 * 垃圾回收工具集
 * @description 提供Three.js对象的资源管理和内存清理功能
 * @description 防止WebGL资源泄漏，提高应用性能
 */
export {
  deallocate,
  emptyObject,
}
