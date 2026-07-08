import type { Loader } from 'three'

import {
  LoadingManager,
  TextureLoader,
} from 'three'

import { DRACOLoader, GLTFLoader } from 'three/addons'

import { EventEmitter } from './EventEmitter'

/**
 * 资源类型映射
 */
const ResourceType = {
  GLTFLoader: 'GLTF',
  TextureLoader: 'Texture',
  FontLoader: 'Font',
  MMDLoader: 'MMD',
  MTLLoader: 'MTL',
  OBJLoader: 'OBJ',
  PCDLoader: 'PCD',
  FileLoader: 'File',
  ImageLoader: 'Image',
  ObjectLoader: 'Object',
  MaterialLoader: 'Material',
  CubeTextureLoader: 'CubeTexture',
  RGBELoader: 'RGBELoader',
  FBXLoader: 'FBX',
} as const

/**
 * 资源类型值数组
 */
const types = Object.values(ResourceType)

/**
 * 资源类型
 */
type ResourceTypeValue = typeof ResourceType[keyof typeof ResourceType]

/**
 * 资源项类型
 */
type ResourceItem = {

  /**
   * 资源类型
   */
  type: ResourceTypeValue

  /**
   * 资源路径
   */
  path: string

  /**
   * 资源名称
   */
  name: string

  /**
   * 资源数据
   */
  data: any
}

/**
 * 资源配置类型
 */
type ResourceConfig = {

  /**
   * Draco解码器路径
   */
  dracoPath?: string
}

/**
 * 加载器配置类型
 */
type LoaderConfig = {

  /**
   * 加载器类
   */
  loader: new (manager?: LoadingManager) => Loader

  /**
   * 加载器名称
   */
  name: keyof typeof ResourceType
}

/**
 * 加载器映射类型
 */
type LoaderMap = {
  [K in ResourceTypeValue]?: Loader
}

/**
 * 资源管理类
 * @description 负责管理Three.js资源的加载和管理
 * @description 支持多种资源类型的加载，包括GLTF、纹理、字体等
 * @description 提供进度监听、错误处理和资源缓存功能
 * @description 支持Draco压缩格式的GLTF文件
 */
export class Resource extends EventEmitter {
  /**
   * Draco解码器路径
   */
  public dracoPath: string

  /**
   * 已加载的资源数量
   */
  public itemsLoaded: number

  /**
   * 总资源数量
   */
  public itemsTotal: number

  /**
   * 资源数组
   */
  public assets: ResourceItem[]

  /**
   * 加载器映射
   */
  public loaders: LoaderMap

  /**
   * 加载管理器
   */
  public manager: LoadingManager

  /**
   * 构造函数
   * @param config - 资源配置对象
   * @param config.dracoPath - Draco解码器路径
   */
  constructor({ dracoPath }: ResourceConfig = {
  }) {
    super()
    this.dracoPath = dracoPath || './draco/gltf/'
    this.itemsLoaded = 0
    this.itemsTotal = 0
    this.assets = []
    this.loaders = {
    }
    this.manager = this.initManager()
    this.initDefaultLoader()
  }

  /**
   * 初始化加载管理器
   * @returns 加载管理器实例
   */
  initManager(): LoadingManager {
    const manager = new LoadingManager()

    manager.onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
      this.itemsLoaded = itemsLoaded
      this.itemsTotal = itemsTotal
      this.emit('onProgress', url, itemsLoaded, itemsTotal)
    }

    manager.onError = (url: string) => {
      this.emit('onError', url)
    }

    return manager
  }

  /**
   * 初始化默认加载器
   * @description 添加GLTF和纹理加载器
   */
  initDefaultLoader(): void {
    const defaultLoaders: LoaderConfig[] = [
      {
        loader: GLTFLoader,
        name: 'GLTFLoader',
      },
      {
        loader: TextureLoader,
        name: 'TextureLoader',
      },
    ]

    defaultLoaders.forEach(item => this.addLoader(item.loader, item.name))
  }

  /**
   * 初始化Draco解码器
   * @param loader - GLTF加载器实例
   */
  initDraco(loader: GLTFLoader): void {
    const dracoLoader = new DRACOLoader()

    dracoLoader.setDecoderPath(this.dracoPath)
    dracoLoader.preload()
    loader.setDRACOLoader(dracoLoader)
  }

  /**
   * 添加加载器
   * @param LoaderClass - 加载器类
   * @param loaderName - 加载器名称
   */
  addLoader(LoaderClass: new (manager?: LoadingManager) => any, loaderName: keyof typeof ResourceType = 'GLTFLoader'): void {
    if (LoaderClass.name && ResourceType[loaderName]) {
      const hasLoader = this.loaders[ResourceType[loaderName]]

      if (!hasLoader) {
        const instance = new LoaderClass(this.manager)

        if (instance && typeof instance.load === 'function') {
          if (loaderName === 'GLTFLoader') {
            this.initDraco(instance as GLTFLoader)
          }

          this.loaders[ResourceType[loaderName]] = instance
        }
      }
    }
    else {
      throw new Error('请配置正确的加载器')
    }
  }

  /**
   * 加载单个资源项
   * @param item - 资源项
   * @returns Promise<ResourceItem>
   */
  loadItem(item: Omit<ResourceItem, 'data'>): Promise<ResourceItem> {
    return new Promise((resolve, reject) => {
      if (!this.loaders[item.type]) {
        throw new Error(`资源${item.path}没有配置加载器`)
      }

      this.loaders[item.type]!.load(
        item.path,
        (data: any) => {
          this.itemsLoaded++
          this.emit('onProgress', item.path, this.itemsLoaded, this.itemsTotal)
          resolve({
            ...item,
            data,
          })
        },
        undefined,
        (err: unknown) => {
          this.emit('onError', err)
          reject(err)
        },
      )
    })
  }

  /**
   * 加载所有资源
   * @param assets - 资源数组
   * @returns Promise<ResourceItem[]>
   */
  loadAll(assets: Array<{ type: string, path: string, name: string }>): Promise<ResourceItem[]> {
    this.itemsLoaded = 0
    this.itemsTotal = 0
    return new Promise((resolve, reject) => {
      const currentAssets = this.matchType(assets)

      const promises: Promise<ResourceItem>[] = []

      this.itemsTotal = currentAssets.length
      currentAssets.forEach((item) => {
        const currentItem = this.loadItem(item)

        promises.push(currentItem)
      })

      Promise.all(promises)
        .then((res) => {
          this.assets = res
          this.emit('onLoad')
          resolve(res)
        })
        .catch((err) => {
          this.emit('onError', err)
          reject(err)
        })
    })
  }

  /**
   * 匹配资源类型
   * @param assets - 原始资源数组
   * @returns 匹配后的资源数组
   */
  matchType(assets: Array<{ type: string, path: string, name: string }>): Omit<ResourceItem, 'data'>[] {
    const matchedAssets = assets
      .map((item) => {
        const type = types.includes(item.type as ResourceTypeValue) ? item.type as ResourceTypeValue : ''

        return {
          type: type as ResourceTypeValue,
          path: item.path,
          name: item.name,
        }
      })
      .filter((item) => {
        if (!item.type) {
          throw new Error(`资源${item.path},type不正确`)
        }

        return item.type
      })

    return matchedAssets
  }

  /**
   * 获取资源数据
   * @param name - 资源名称
   * @returns 资源数据
   */
  getResource(name: string): any {
    const current = this.assets.find((item) => {
      return item.name === name
    })

    if (!current) {
      throw new Error(`资源${name}不存在`)
    }

    return current.data
  }

  /**
   * 销毁资源管理器
   * @description 清理事件监听器和资源数组
   */
  destroy(): void {
    this.off('onProgress')
    this.off('onLoad')
    this.off('onError')
    this.assets = []
  }
}
