import * as Three from 'three'

type RaycastOptions = {
  container: HTMLElement
  camera: Three.Camera
  targetObject: Three.Object3D
  onIntersect?: (object: Three.Object3D) => void
  onNoIntersect?: () => void
}

/**
 * 初始化 Three.js Raycaster 工具
 * @param options - 配置参数
 * @returns 一个对象，包含移除事件监听的方法
 */
export function useRaycaster(options: RaycastOptions) {
  const { container, camera, targetObject, onIntersect, onNoIntersect } = options

  const raycaster = new Three.Raycaster()

  const mouse = new Three.Vector2()

  const updateMousePosition = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect()

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  const checkIntersection = () => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(targetObject, true)

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object

      container.style.cursor = 'pointer' // Change cursor to pointer
      if (onIntersect) {
        onIntersect(intersectedObject)
      }
    }
    else {
      container.style.cursor = 'default' // Change cursor back to default
      if (onNoIntersect) {
        onNoIntersect()
      }
    }
  }

  const onPointerMove = (event: PointerEvent) => {
    updateMousePosition(event)
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(targetObject, true)

    if (intersects.length > 0) {
      container.style.cursor = 'pointer' // Change cursor to pointer
    }
    else {
      container.style.cursor = 'default' // Change cursor back to default
    }
  }

  const onPointerDown = (event: PointerEvent) => {
    updateMousePosition(event)
    checkIntersection()
  }

  const onPointerUp = (event: PointerEvent) => {
    updateMousePosition(event)
    checkIntersection()
  }

  container.addEventListener('pointermove', onPointerMove)
  container.addEventListener('pointerdown', onPointerDown)
  container.addEventListener('pointerup', onPointerUp)

  return {
    removeEventListeners: () => {
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointerup', onPointerUp)
    },
  }
}
