import * as three from 'three'

/**
 * 添加光源
 * @param scene - 要添加光源的 Three.js 场景对象
 */
export function addLights(scene: three.Scene) {
  /**
   * 环境光
   * 环境光是均匀地照亮整个场景的光源，没有明确的方向。
   * 颜色为 0x404040，强度为 0.5。
   */
  const ambientLight = new three.AmbientLight(0x404040, 0.5)

  scene.add(ambientLight)

  /**
   * 平行光
   * 平行光是一种来自无限远处的光源，类似于太阳光。
   * 颜色为 0xFFFFFF，强度为 1。
   * 光源位置设置为 (0, 10, 0)。
   */
  const directionalLight = new three.DirectionalLight(0xFFFFFF, 1)

  directionalLight.position.set(0, 10, 0)
  scene.add(directionalLight)

  /**
   * 点光源
   * 点光源是一种从一个点向外发散的光源，类似于灯泡。
   * 颜色为 0xFFFFFF，强度为 1，距离衰减为 100。
   * 光源位置设置为 (5, 5, 5)。
   */
  const pointLight = new three.PointLight(0xFFFFFF, 1, 100)

  pointLight.position.set(5, 5, 5)
  scene.add(pointLight)
}
