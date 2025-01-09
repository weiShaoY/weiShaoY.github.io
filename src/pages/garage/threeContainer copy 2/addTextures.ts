import type { ThreeContainerType } from './types'

import * as three from 'three'

/**
 * 添加贴图
 * @param maps - 存储贴图的引用对象
 */
export function addTextures(maps: Ref<ThreeContainerType.MapsType>) {
  const textureLoader = new three.TextureLoader()

  /**
   * 加载汽车车身AO贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.value.carAo = textureLoader.load('/models/garage/textures/t_car_body_AO.raw.jpg', (texture) => {
    // 设置汽车车身AO贴图的翻转
    texture.flipY = false

    // 设置汽车车身AO贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace

    // 设置汽车车身AO贴图的最小过滤
    texture.minFilter = three.LinearFilter

    // 设置汽车车身AO贴图的最大过滤
    texture.magFilter = three.LinearFilter

    // 设置汽车车身AO贴图的通道
    texture.channel = 1
  })

  /**
   * 加载起始房间光贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.value.startRoomLight = textureLoader.load('/models/garage/textures/t_startroom_light.raw.jpg', (texture) => {
    // 设置起始房间光贴图的翻转
    texture.flipY = false

    // 设置起始房间光贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace
  })

  /**
   * 加载起始房间AO贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.value.startRoomAo = textureLoader.load('/models/garage/textures/t_startroom_ao.raw.jpg', (texture) => {
    // 设置起始房间AO贴图的翻转
    texture.flipY = false

    // 设置起始房间AO贴图的通道
    texture.channel = 1

    // 设置起始房间AO贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace
  })

  /**
   * 加载地板粗糙度贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.value.floorRoughness = textureLoader.load('/models/garage/textures/t_floor_roughness.webp', (texture) => {
    // 设置地板粗糙度贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace

    // 设置地板粗糙度贴图的包裹方式
    texture.wrapS = texture.wrapT = three.RepeatWrapping
  })

  /**
   * 加载地板法线贴图
   * @param texture - 加载完成的纹理对象
   */
  maps.value.floorNormal = textureLoader.load('/models/garage/textures/t_floor_normal.webp', (texture) => {
    // 设置地板法线贴图的色彩空间
    texture.colorSpace = three.LinearSRGBColorSpace

    // 设置地板法线贴图的包裹方式
    texture.wrapS = texture.wrapT = three.RepeatWrapping
  })
}
