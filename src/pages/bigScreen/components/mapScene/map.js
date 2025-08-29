// 导入 D3 地理投影库
import { geoMercator } from 'd3-geo'
// 导入 GSAP 动画库
import gsap from 'gsap'

// 导入 Three.js 相关模块
import {
  AddEquation, // 加法混合方程
  AdditiveBlending, // 加法混合模式
  AmbientLight, // 环境光
  BoxGeometry, // 盒子几何体
  Color, // 颜色类
  CustomBlending, // 自定义混合模式
  DirectionalLight, // 平行光
  DoubleSide, // 双面材质
  DstColorFactor, // 目标颜色因子
  Fog, // 雾效果
  Group, // 组对象
  LineBasicMaterial, // 基础线条材质
  Mesh, // 网格对象
  MeshBasicMaterial, // 基础网格材质
  MeshLambertMaterial, // Lambert 网格材质
  MeshStandardMaterial, // 标准网格材质
  NearestFilter, // 最近邻过滤
  OneFactor, // 一因子
  PlaneGeometry, // 平面几何体
  PointLight, // 点光源
  PointsMaterial, // 点材质
  QuadraticBezierCurve3, // 三次贝塞尔曲线
  RepeatWrapping, // 重复包裹
  Sprite, // 精灵对象
  SpriteMaterial, // 精灵材质
  SRGBColorSpace, // sRGB 颜色空间
  TubeGeometry, // 管道几何体
  Vector3, // 三维向量
} from 'three'
// 导入交互管理器
import { InteractionManager } from 'three.interactive'

// 导入事件发射器
import emitter from '../../utils/emitter'

// 导入地图数据
import chinaData from './map/chinaData' // 中国地图数据

import infoData from './map/infoData' // 信息点数据

import provincesData from './map/provincesData' // 省份数据

import scatterData from './map/scatter' // 散点数据

// 导入自定义 3D 组件
import {
  BaseMap, // 基础地图
  DiffuseShader, // 扩散着色器
  ExtrudeMap, // 挤压地图
  Focus, // 焦点效果
  GradientShader, // 渐变着色器
  Grid, // 网格
  Label3d, // 3D 标签
  Line, // 线条
  Mini3d, // 迷你 3D 基础类
  Particles, // 粒子系统
  Plane, // 平面
} from './mini3d'
// 导入标签图标资源
import labelIcon from './texture/label-icon.png'

/**
 * 按数值排序函数
 * @param {Array} data - 需要排序的数据数组
 * @returns {Array} 排序后的数据数组
 */
function sortByValue(data) {
  data.sort((a, b) => b.value - a.value) // 按 value 值降序排列
  return data
}
/**
 * 世界类 - 继承自 Mini3d 基础类
 * 负责管理整个 3D 地图场景
 */
export class World extends Mini3d {
  /**
   * 构造函数
   * @param  canvas - 画布元素
   * @param  assets - 资源对象
   */
  constructor(canvas, assets) {
    super(canvas) // 调用父类构造函数

    // 地理投影中心坐标 [经度, 纬度] (省中心点)
    this.geoProjectionCenter = [111.75, 27.55] // 娄底市中心

    // 地理投影缩放比例
    this.geoProjectionScale = 120

    // 飞线中心坐标 [经度, 纬度]
    // this.flyLineCenter = [113.544372, 23.329249]
    // 长沙
    this.flyLineCenter = [112.9823, 28.1941]

    // 地图拉伸高度
    this.depth = 0.5

    // 地图焦点标签信息
    // this.mapFocusLabelInfo = {
    //   name: '广东省', // 中文名称
    //   enName: 'GUANGDONG PROVINCE', // 英文名称
    //   center: [113.280637, 20.625178], // 中心坐标
    // }

    this.mapFocusLabelInfo = {
      name: '湖南省', // 中文名称
      enName: 'HUNAN PROVINCE', // 英文名称
      center: [111.42, 23.99], // 中心坐标
    }

    // 是否已点击状态
    this.clicked = false

    // 创建雾效果 - 颜色、近平面、远平面
    this.scene.fog = new Fog(0x102736, 1, 50)

    // 设置场景背景颜色
    this.scene.background = new Color(0x102736)

    // 设置相机初始位置
    this.camera.instance.position.set(-13.767695123014105, 12.990152163077308, 39.28228164159694)

    this.camera.instance.near = 1 // 近裁剪面

    this.camera.instance.far = 10000 // 远裁剪面

    this.camera.instance.updateProjectionMatrix() // 更新投影矩阵

    // 创建交互管理器
    this.interactionManager = new InteractionManager(
      this.renderer.instance,
      this.camera.instance,
      this.canvas,
    )

    this.assets = assets // 保存资源对象

    // 初始化环境光照
    this.initEnvironment()

    // 初始化场景
    this.init()
  }

  /**
   * 初始化场景
   */
  init() {
    // 创建标签组
    this.labelGroup = new Group()
    this.label3d = new Label3d(this) // 创建 3D 标签管理器
    this.labelGroup.rotation.x = -Math.PI / 2 // 旋转 90 度
    this.scene.add(this.labelGroup) // 添加到场景
    // 创建飞线焦点光圈组
    this.flyLineFocusGroup = new Group()
    this.flyLineFocusGroup.visible = false // 初始隐藏
    this.flyLineFocusGroup.rotation.x = -Math.PI / 2 // 旋转 90 度
    this.scene.add(this.flyLineFocusGroup) // 添加到场景
    // 区域事件元素数组
    this.eventElement = []
    // 鼠标交互材质
    this.defaultMaterial = null // 默认材质
    this.defaultLightMaterial = null // 高亮材质
    // 创建底部背景
    this.createBottomBg()
    // 创建中国模糊边线
    this.createChinaBlurLine()

    // 创建扩散网格
    this.createGrid()
    // 创建旋转圆环
    this.createRotateBorder()
    // 创建标签
    this.createLabel()
    // 创建地图
    this.createMap()
    // 添加交互事件
    this.createEvent()
    // 创建飞线
    this.createFlyLine()
    // 创建飞线焦点
    this.createFocus()
    // 创建粒子系统
    this.createParticles()
    // 创建散点图
    this.createScatter()
    // 创建信息点
    this.createInfoPoint()
    // 创建轮廓线
    this.createStorke()

    /**
     * 创建动画时间线
     */
    const tl = gsap.timeline({
      onComplete: () => {}, // 动画完成回调
    })

    tl.pause() // 暂停时间线
    this.animateTl = tl // 保存时间线引用
    tl.addLabel('focusMap', 1.5) // 添加焦点地图标签
    tl.addLabel('focusMapOpacity', 2) // 添加焦点地图透明度标签
    tl.addLabel('bar', 3) // 添加柱状图标签
    // 相机位置动画
    tl.to(this.camera.instance.position, {
      duration: 2, // 持续时间 2 秒
      x: -0.17427287762525134, // 目标 X 坐标
      y: 13.678992786206543, // 目标 Y 坐标
      z: 20.688611202093714, // 目标 Z 坐标
      ease: 'circ.out', // 缓动函数
      onStart: () => {
        this.flyLineFocusGroup.visible = false // 隐藏飞线焦点组
      },
    })
    // 焦点地图位置动画
    tl.to(
      this.focusMapGroup.position,
      {
        duration: 1, // 持续时间 1 秒
        x: 0, // 目标 X 位置
        y: 0, // 目标 Y 位置
        z: 0, // 目标 Z 位置
      },
      'focusMap', // 与 focusMap 标签同步
    )

    // 焦点地图缩放动画
    tl.to(
      this.focusMapGroup.scale,
      {
        duration: 1, // 持续时间 1 秒
        x: 1, // 目标 X 缩放
        y: 1, // 目标 Y 缩放
        z: 1, // 目标 Z 缩放
        ease: 'circ.out', // 缓动函数
        onComplete: () => {
          this.flyLineGroup.visible = true // 显示飞线组
          this.scatterGroup.visible = true // 显示散点组
          this.InfoPointGroup.visible = true // 显示信息点组
          this.createInfoPointLabelLoop() // 创建信息点标签循环
        },
      },
      'focusMap', // 与 focusMap 标签同步
    )

    // 焦点地图顶面材质透明度动画
    tl.to(
      this.focusMapTopMaterial,
      {
        duration: 1, // 持续时间 1 秒
        opacity: 1, // 目标不透明度
        ease: 'circ.out', // 缓动函数
      },
      'focusMapOpacity', // 与 focusMapOpacity 标签同步
    )
    // 焦点地图侧面材质透明度动画
    tl.to(
      this.focusMapSideMaterial,
      {
        duration: 1, // 持续时间 1 秒
        opacity: 1, // 目标不透明度
        ease: 'circ.out', // 缓动函数
        onComplete: () => {
          this.focusMapSideMaterial.transparent = false // 动画完成后禁用透明度
        },
      },
      'focusMapOpacity', // 与 focusMapOpacity 标签同步
    )
    // 其他标签动画
    this.otherLabel.map((item, index) => {
      const element = item.element.querySelector('.other-label') // 获取标签元素
      tl.to(
        element,
        {
          duration: 1, // 持续时间 1 秒
          delay: 0.1 * index, // 延迟时间（按索引递增）
          translateY: 0, // 目标Y位移
          opacity: 1, // 目标不透明度
          ease: 'circ.out', // 缓动函数
        },
        'focusMapOpacity', // 与 focusMapOpacity 标签同步
      )
    })
    // 地图边线材质透明度动画
    tl.to(
      this.mapLineMaterial,
      {
        duration: 0.5, // 持续时间 0.5 秒
        delay: 0.3, // 延迟 0.3 秒
        opacity: 1, // 目标不透明度
      },
      'focusMapOpacity', // 与 focusMapOpacity 标签同步
    )
    // 旋转边框1缩放动画
    tl.to(
      this.rotateBorder1.scale,
      {
        delay: 0.3, // 延迟 0.3 秒
        duration: 1, // 持续时间 1 秒
        x: 1, // 目标X缩放
        y: 1, // 目标Y缩放
        z: 1, // 目标Z缩放
        ease: 'circ.out', // 缓动函数
      },
      'focusMapOpacity', // 与 focusMapOpacity 标签同步
    )
    // 旋转边框2缩放动画
    tl.to(
      this.rotateBorder2.scale,
      {
        duration: 1, // 持续时间 1 秒
        delay: 0.5, // 延迟 0.5 秒
        x: 1, // 目标X缩放
        y: 1, // 目标Y缩放
        z: 1, // 目标Z缩放
        ease: 'circ.out', // 缓动函数
        onComplete: () => {
          this.flyLineFocusGroup.visible = true // 显示飞线焦点组
          emitter.$emit('mapPlayComplete') // 发射地图播放完成事件
        },
      },
      'focusMapOpacity', // 与 focusMapOpacity 标签同步
    )

    // 柱状图缩放动画
    this.allBar.map((item, index) => {
      if (item.userData.name === '广州市') { // 跳过广州市
        return false
      }
      tl.to(
        item.scale,
        {
          duration: 1, // 持续时间 1 秒
          delay: 0.1 * index, // 延迟时间（按索引递增）
          x: 1, // 目标X缩放
          y: 1, // 目标Y缩放
          z: 1, // 目标Z缩放
          ease: 'circ.out', // 缓动函数
        },
        'bar', // 与 bar 标签同步
      )
    })
    // 柱状图材质透明度动画
    this.allBarMaterial.map((item, index) => {
      tl.to(
        item,
        {
          duration: 1, // 持续时间 1 秒
          delay: 0.1 * index, // 延迟时间（按索引递增）
          opacity: 1, // 目标不透明度
          ease: 'circ.out', // 缓动函数
        },
        'bar', // 与 bar 标签同步
      )
    })

    // 省份标签动画
    this.allProvinceLabel.map((item, index) => {
      const element = item.element.querySelector('.provinces-label-wrap') // 获取标签包装元素
      const number = item.element.querySelector('.number .value') // 获取数值元素
      const numberVal = Number(number.textContent) // 获取数值
      const numberAnimate = {
        score: 0, // 动画数值对象
      }
      // 标签元素位移动画
      tl.to(
        element,
        {
          duration: 1, // 持续时间 1 秒
          delay: 0.2 * index, // 延迟时间（按索引递增）
          translateY: 0, // 目标Y位移
          opacity: 1, // 目标不透明度
          ease: 'circ.out', // 缓动函数
        },
        'bar', // 与 bar 标签同步
      )
      // 数值计数动画
      tl.to(
        numberAnimate,
        {
          duration: 1, // 持续时间 1 秒
          delay: 0.2 * index, // 延迟时间（按索引递增）
          score: numberVal, // 目标数值
          onUpdate: showScore, // 更新回调函数
        },
        'bar', // 与 bar 标签同步
      )
      /**
       * 显示分数函数
       */
      function showScore() {
        number.textContent = numberAnimate.score.toFixed(0) // 更新显示数值
      }
    })
    // 光圈缩放动画
    this.allGuangquan.map((item, index) => {
      // 第一个光圈缩放动画
      tl.to(
        item.children[0].scale,
        {
          duration: 1, // 持续时间 1 秒
          delay: 0.1 * index, // 延迟时间（按索引递增）
          x: 1, // 目标X缩放
          y: 1, // 目标Y缩放
          z: 1, // 目标Z缩放
          ease: 'circ.out', // 缓动函数
        },
        'bar', // 与 bar 标签同步
      )
      // 第二个光圈缩放动画
      tl.to(
        item.children[1].scale,
        {
          duration: 1, // 持续时间 1 秒
          delay: 0.1 * index, // 延迟时间（按索引递增）
          x: 1, // 目标X缩放
          y: 1, // 目标Y缩放
          z: 1, // 目标Z缩放
          ease: 'circ.out', // 缓动函数
        },
        'bar', // 与 bar 标签同步
      )
    })
  }

  /**
   * 初始化环境光照
   */
  initEnvironment() {
    // 创建环境光
    const sun = new AmbientLight(0xFFFFFF, 5) // 白色环境光，强度 5
    this.scene.add(sun) // 添加到场景
    // 创建平行光
    const directionalLight = new DirectionalLight(0xFFFFFF, 5) // 白色平行光，强度 5
    directionalLight.position.set(-30, 6, -8) // 设置光源位置
    directionalLight.castShadow = true // 启用阴影
    directionalLight.shadow.radius = 20 // 阴影半径
    directionalLight.shadow.mapSize.width = 1024 // 阴影贴图宽度
    directionalLight.shadow.mapSize.height = 1024 // 阴影贴图高度
    this.scene.add(directionalLight) // 添加到场景
    // 创建第一个点光源
    this.createPointLight({
      color: '#1d5e5e', // 颜色
      intensity: 800, // 强度
      distance: 10000, // 距离
      x: -9, // X 坐标
      y: 3, // Y 坐标
      z: -3, // Z 坐标
    })
    // 创建第二个点光源
    this.createPointLight({
      color: '#1d5e5e', // 颜色
      intensity: 200, // 强度
      distance: 10000, // 距离
      x: 0, // X 坐标
      y: 2, // Y 坐标
      z: 5, // Z 坐标
    })
  }

  /**
   * 创建点光源
   * @param {object} pointParams - 点光源参数
   */
  createPointLight(pointParams) {
    const pointLight = new PointLight(0x1D5E5E, pointParams.intensity, pointParams.distance) // 创建点光源
    pointLight.position.set(pointParams.x, pointParams.y, pointParams.z) // 设置位置
    this.scene.add(pointLight) // 添加到场景
  }

  /**
   * 创建地图
   */
  createMap() {
    const mapGroup = new Group() // 创建地图组
    const focusMapGroup = new Group() // 创建焦点地图组
    this.focusMapGroup = focusMapGroup // 保存引用
    const { china, chinaTopLine } = this.createChina() // 创建中国地图
    const { map, mapTop, mapLine } = this.createProvince() // 创建省份地图
    china.setParent(mapGroup) // 设置父级
    chinaTopLine.setParent(mapGroup) // 设置父级
    // 创建扩散效果
    this.createDiffuse()
    map.setParent(focusMapGroup) // 设置父级
    mapTop.setParent(focusMapGroup) // 设置父级
    mapLine.setParent(focusMapGroup) // 设置父级
    focusMapGroup.position.set(0, 0, -0.01) // 设置位置
    focusMapGroup.scale.set(1, 1, 0) // 设置缩放
    mapGroup.add(focusMapGroup) // 添加到地图组
    mapGroup.rotation.x = -Math.PI / 2 // 旋转 90 度
    mapGroup.position.set(0, 0.2, 0) // 设置位置
    this.scene.add(mapGroup) // 添加到场景
    this.createBar() // 创建柱状图
  }

  /**
   * 创建中国地图
   * @returns {object} 包含中国地图和边线的对象
   */
  createChina() {
    // 地图参数配置
    const params = {
      chinaBgMaterialColor: '#152c47', // 中国地图背景材质颜色
      lineColor: '#3f82cd', // 边线颜色
    }
    // 获取中国地图数据
    const chinaData = this.assets.instance.getResource('china')
    // 创建中国地图背景材质
    const chinaBgMaterial = new MeshLambertMaterial({
      color: new Color(params.chinaBgMaterialColor), // 设置颜色
      transparent: true, // 启用透明度
      opacity: 1, // 不透明度
    })
    // 创建中国地图
    const china = new BaseMap(this, {
      data: chinaData, // 地图数据
      geoProjectionCenter: this.geoProjectionCenter, // 投影中心
      geoProjectionScale: this.geoProjectionScale, // 投影缩放
      merge: true, // 合并几何体
      material: chinaBgMaterial, // 材质
      renderOrder: 2, // 渲染顺序
    })
    // 创建中国地图边线材质
    const chinaTopLineMaterial = new LineBasicMaterial({
      color: params.lineColor, // 边线颜色
    })
    // 创建中国地图边线
    const chinaTopLine = new Line(this, {
      data: chinaData, // 地图数据
      geoProjectionCenter: this.geoProjectionCenter, // 投影中心
      geoProjectionScale: this.geoProjectionScale, // 投影缩放
      material: chinaTopLineMaterial, // 材质
      renderOrder: 3, // 渲染顺序
    })
    chinaTopLine.lineGroup.position.z += 0.01 // 调整边线 Z 位置
    return { china, chinaTopLine } // 返回地图和边线对象
  }

  /**
   * 创建省份地图
   * @returns {object} 包含省份地图、顶面和边线的对象
   */
  createProvince() {
    // 获取省份地图数据
    const mapJsonData = this.assets.instance.getResource('mapJson')
    // 创建省份材质
    const [topMaterial, sideMaterial] = this.createProvinceMaterial()
    this.focusMapTopMaterial = topMaterial // 保存顶面材质引用
    this.focusMapSideMaterial = sideMaterial // 保存侧面材质引用
    // 创建挤压地图
    const map = new ExtrudeMap(this, {
      geoProjectionCenter: this.geoProjectionCenter, // 投影中心
      geoProjectionScale: this.geoProjectionScale, // 投影缩放
      position: new Vector3(0, 0, 0.11), // 位置
      data: mapJsonData, // 地图数据
      depth: this.depth, // 挤压深度
      topFaceMaterial: topMaterial, // 顶面材质
      sideMaterial, // 侧面材质
      renderOrder: 9, // 渲染顺序
    })
    // 创建面材质
    const faceMaterial = new MeshStandardMaterial({
      color: 0xFFFFFF, // 白色
      transparent: true, // 启用透明度
      opacity: 0.5, // 不透明度
    })

    // 创建面渐变着色器
    const faceGradientShader = new GradientShader(faceMaterial, {
      uColor1: 0x12BBE0, // 渐变颜色1
      uColor2: 0x0094B5, // 渐变颜色2
    })
    this.defaultMaterial = faceMaterial // 保存默认材质
    this.defaultLightMaterial = this.defaultMaterial.clone() // 克隆高亮材质
    this.defaultLightMaterial.color = new Color('rgba(115,208,255,1)') // 设置高亮颜色
    this.defaultLightMaterial.opacity = 0.8 // 设置高亮不透明度
    // 创建地图顶面
    const mapTop = new BaseMap(this, {
      geoProjectionCenter: this.geoProjectionCenter, // 投影中心
      geoProjectionScale: this.geoProjectionScale, // 投影缩放
      position: new Vector3(0, 0, this.depth + 0.22), // 位置
      data: mapJsonData, // 地图数据
      material: faceMaterial, // 材质
      renderOrder: 2, // 渲染顺序
    })
    // 收集可交互的网格元素
    mapTop.mapGroup.children.map((group) => {
      group.children.map((mesh) => {
        if (mesh.type === 'Mesh') {
          this.eventElement.push(mesh) // 添加到事件元素数组
        }
      })
    })
    // 创建地图边线材质
    this.mapLineMaterial = new LineBasicMaterial({
      color: 0xFFFFFF, // 白色
      opacity: 0, // 初始不透明度为0
      transparent: true, // 启用透明度
      fog: false, // 禁用雾效果
    })
    // 创建地图边线
    const mapLine = new Line(this, {
      geoProjectionCenter: this.geoProjectionCenter, // 投影中心
      geoProjectionScale: this.geoProjectionScale, // 投影缩放
      data: mapJsonData, // 地图数据
      material: this.mapLineMaterial, // 材质
      renderOrder: 3, // 渲染顺序
    })
    mapLine.lineGroup.position.z += this.depth + 0.23 // 调整边线 Z 位置
    return {
      map, // 挤压地图
      mapTop, // 顶面地图
      mapLine, // 边线
    }
  }

  /**
   * 创建省份材质
   * @returns {Array} 包含顶面材质和侧面材质的数组
   */
  createProvinceMaterial() {
    // 创建顶面材质
    const topMaterial = new MeshLambertMaterial({
      color: 0xFFFFFF, // 白色
      transparent: true, // 启用透明度
      opacity: 0, // 初始不透明度为0
      fog: false, // 禁用雾效果
      side: DoubleSide, // 双面材质
    })
    // 自定义着色器编译
    topMaterial.onBeforeCompile = (shader) => {
      // 添加自定义uniform变量
      shader.uniforms = {
        ...shader.uniforms,
        uColor1: { value: new Color(0x2A6E92) }, // 渐变颜色1
        uColor2: { value: new Color(0x102736) }, // 渐变颜色2
      }
      // 修改顶点着色器
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        `
        attribute float alpha; // 透明度属性
        varying vec3 vPosition; // 位置变量
        varying float vAlpha; // 透明度变量
        void main() {
          vAlpha = alpha; // 传递透明度
          vPosition = position; // 传递位置
      `,
      )
      // 修改片段着色器
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        varying vec3 vPosition; // 位置变量
        varying float vAlpha; // 透明度变量
        uniform vec3 uColor1; // 渐变颜色1
        uniform vec3 uColor2; // 渐变颜色2
        void main() {
      `,
      )
      // 替换片段着色器主函数
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        /* glsl */ `
      #ifdef OPAQUE
      diffuseColor.a = 1.0; // 不透明时设置alpha为1
      #endif
            #ifdef USE_TRANSMISSION
      diffuseColor.a *= transmissionAlpha + 0.1; // 传输时调整alpha
      #endif
      vec3 gradient = mix(uColor1, uColor2, vPosition.x/15.78); // 计算渐变
      outgoingLight = outgoingLight*gradient; // 应用渐变
      float topAlpha = 0.5; // 顶面透明度
      if(vPosition.z>0.3){ // 如果Z位置大于0.3
        diffuseColor.a *= topAlpha; // 应用顶面透明度
      }
      gl_FragColor = vec4( outgoingLight, diffuseColor.a  ); // 输出最终颜色
      `,
      )
    }
    // 获取侧面贴图
    const sideMap = this.assets.instance.getResource('side')
    sideMap.wrapS = RepeatWrapping // 设置S方向重复包裹
    sideMap.wrapT = RepeatWrapping // 设置T方向重复包裹
    sideMap.repeat.set(1, 1.5) // 设置重复次数
    sideMap.offset.y += 0.065 // 设置Y方向偏移
    // 创建侧面材质
    const sideMaterial = new MeshStandardMaterial({
      color: 0xFFFFFF, // 白色
      map: sideMap, // 侧面贴图
      fog: false, // 禁用雾效果
      opacity: 0, // 初始不透明度为0
      side: DoubleSide, // 双面材质
    })
    // 添加时间更新监听，实现贴图滚动效果
    this.time.on('tick', () => {
      sideMap.offset.y += 0.005 // 每帧增加Y偏移
    })
    // 自定义侧面材质着色器编译
    sideMaterial.onBeforeCompile = (shader) => {
      // 添加自定义uniform变量
      shader.uniforms = {
        ...shader.uniforms,
        uColor1: { value: new Color(0x2A6E92) }, // 渐变颜色1
        uColor2: { value: new Color(0x2A6E92) }, // 渐变颜色2
      }
      // 修改顶点着色器
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        `
        attribute float alpha; // 透明度属性
        varying vec3 vPosition; // 位置变量
        varying float vAlpha; // 透明度变量
        void main() {
          vAlpha = alpha; // 传递透明度
          vPosition = position; // 传递位置
      `,
      )
      // 修改片段着色器
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        varying vec3 vPosition; // 位置变量
        varying float vAlpha; // 透明度变量
        uniform vec3 uColor1; // 渐变颜色1
        uniform vec3 uColor2; // 渐变颜色2
        void main() {
      `,
      )
      // 替换片段着色器主函数
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        /* glsl */ `
      #ifdef OPAQUE
      diffuseColor.a = 1.0; // 不透明时设置alpha为1
      #endif
            #ifdef USE_TRANSMISSION
      diffuseColor.a *= transmissionAlpha + 0.1; // 传输时调整alpha
      #endif
      vec3 gradient = mix(uColor1, uColor2, vPosition.z/1.2); // 计算Z方向渐变
      outgoingLight = outgoingLight*gradient; // 应用渐变
      gl_FragColor = vec4( outgoingLight, diffuseColor.a  ); // 输出最终颜色
      `,
      )
    }
    return [topMaterial, sideMaterial] // 返回顶面材质和侧面材质
  }

  /**
   * 创建柱状图
   */
  createBar() {
    const self = this // 保存this引用
    // 获取前7个省份数据并按值排序
    const data = sortByValue(provincesData).filter((item, index) => index < 7)
    const barGroup = new Group() // 创建柱状图组
    this.barGroup = barGroup // 保存引用
    const factor = 0.7 // 缩放因子
    const height = 4.0 * factor // 最大高度
    const max = data[0].value // 最大值
    // 初始化数组
    this.allBar = [] // 所有柱状图
    this.allBarMaterial = [] // 所有材质
    this.allGuangquan = [] // 所有光圈
    this.allProvinceLabel = [] // 所有省份标签
    // 遍历数据创建柱状图
    data.map((item, index) => {
      const geoHeight = height * (item.value / max) // 计算柱状图高度
      // 创建柱状图材质
      const material = new MeshBasicMaterial({
        color: 0xFFFFFF, // 白色
        transparent: true, // 启用透明度
        opacity: 0, // 初始不透明度为0
        depthTest: false, // 禁用深度测试
        fog: false, // 禁用雾效果
      })
      // 创建渐变着色器
      new GradientShader(material, {
        uColor1: index > 3 ? 0xFBDF88 : 0x50BBFE, // 根据索引选择颜色1
        uColor2: index > 3 ? 0xFFFEF4 : 0x77FBF5, // 根据索引选择颜色2
        size: geoHeight, // 渐变大小
        dir: 'y', // Y方向渐变
      })

      // 创建盒子几何体
      const geo = new BoxGeometry(0.1 * factor, 0.1 * factor, geoHeight)
      geo.translate(0, 0, geoHeight / 2) // 平移几何体
      const mesh = new Mesh(geo, material) // 创建网格
      mesh.renderOrder = 5 // 设置渲染顺序
      const areaBar = mesh // 保存引用
      const [x, y] = this.geoProjection(item.centroid) // 投影坐标
      areaBar.position.set(x, -y, this.depth + 0.45) // 设置位置
      areaBar.scale.set(1, 1, 0) // 初始缩放为0
      areaBar.userData = { ...item } // 保存用户数据

      // 创建光圈效果
      const guangQuan = this.createQuan(new Vector3(x, this.depth + 0.44, y), index)
      // 创建辉光效果

      const hg = this.createHUIGUANG(geoHeight, index > 3 ? 0xFFFEF4 : 0x77FBF5)
      areaBar.add(...hg) // 添加辉光到柱状图
      barGroup.add(areaBar) // 添加到组
      barGroup.rotation.x = -Math.PI / 2 // 旋转组
      // 创建标签
      const barLabel = labelStyle04(item, index, new Vector3(x, -y, this.depth + 1.1 + geoHeight))
      // 保存到数组
      this.allBar.push(areaBar)
      this.allBarMaterial.push(material)
      this.allGuangquan.push(guangQuan)
      this.allProvinceLabel.push(barLabel)
    })

    this.scene.add(barGroup) // 添加到场景
    /**
     * 创建柱状图标签样式
     * @param {object} data - 数据对象
     * @param {number} index - 索引
     * @param {Vector3} position - 位置
     * @returns {object} 标签对象
     */
    function labelStyle04(data, index, position) {
      // 创建3D标签
      let label = self.label3d.create('', 'provinces-label', false)
      // 初始化标签内容
      label.init(
        `<div class="provinces-label ${index > 4 ? 'yellow' : ''}">
      <div class="provinces-label-wrap">
        <div class="number"><span class="value">${data.value}</span><span class="unit">件</span></div>
        <div class="name">
          <span class="zh">${data.name}</span>
          <span class="en">${data.enName.toUpperCase()}</span>
        </div>
        <div class="no">${index + 1}</div>
      </div>
    </div>`,
        position, // 标签位置
      )
      self.label3d.setLabelStyle(label, 0.01, 'x') // 设置标签样式
      label.setParent(self.labelGroup) // 设置父级
      return label // 返回标签对象
    }
  }

  /**
   * 创建交互事件
   */
  createEvent() {
    let objectsHover = [] // 悬停对象数组
    /**
     * 重置材质
     * @param {object} mesh - 网格对象
     */
    const reset = (mesh) => {
      mesh.traverse((obj) => {
        if (obj.isMesh) {
          obj.material = this.defaultMaterial // 恢复默认材质
        }
      })
    }
    /**
     * 设置高亮材质
     * @param {object} mesh - 网格对象
     */
    const move = (mesh) => {
      mesh.traverse((obj) => {
        if (obj.isMesh) {
          obj.material = this.defaultLightMaterial // 设置高亮材质
        }
      })
    }
    // 为每个事件元素添加交互
    this.eventElement.map((mesh) => {
      this.interactionManager.add(mesh) // 添加到交互管理器
      // 鼠标按下事件
      mesh.addEventListener('mousedown', (ev) => {
        console.log(ev.target.userData.name) // 输出名称
      })
      // 鼠标悬停事件
      mesh.addEventListener('mouseover', (event) => {
        if (!objectsHover.includes(event.target.parent)) {
          objectsHover.push(event.target.parent) // 添加到悬停数组
        }
        document.body.style.cursor = 'pointer' // 设置鼠标样式
        move(event.target.parent) // 设置高亮材质
      })
      // 鼠标离开事件
      mesh.addEventListener('mouseout', (event) => {
        objectsHover = objectsHover.filter(n => n.userData.name !== event.target.parent.userData.name) // 从悬停数组移除
        if (objectsHover.length > 0) {
          const mesh = objectsHover[objectsHover.length - 1] // 获取最后一个悬停对象
        }
        reset(event.target.parent) // 重置材质
        document.body.style.cursor = 'default' // 恢复鼠标样式
      })
    })
  }

  /**
   * 创建辉光效果
   * @param {number} h - 高度
   * @param {number} color - 颜色
   * @returns {Array} 辉光网格数组
   */
  createHUIGUANG(h, color) {
    // 创建平面几何体
    const geometry = new PlaneGeometry(0.35, h)
    geometry.translate(0, h / 2, 0) // 平移几何体
    // 获取辉光贴图
    const texture = this.assets.instance.getResource('huiguang')
    texture.colorSpace = SRGBColorSpace // 设置颜色空间
    texture.wrapS = RepeatWrapping // 设置S方向重复包裹
    texture.wrapT = RepeatWrapping // 设置T方向重复包裹
    // 创建辉光材质
    const material = new MeshBasicMaterial({
      color, // 颜色
      map: texture, // 贴图
      transparent: true, // 启用透明度
      opacity: 0.4, // 不透明度
      depthWrite: false, // 禁用深度写入
      side: DoubleSide, // 双面材质
      blending: AdditiveBlending, // 加法混合
    })
    // 创建辉光网格
    const mesh = new Mesh(geometry, material)
    mesh.renderOrder = 10 // 设置渲染顺序
    mesh.rotateX(Math.PI / 2) // 旋转90度
    // 克隆网格创建多个辉光面
    const mesh2 = mesh.clone()
    const mesh3 = mesh.clone()
    mesh2.rotateY((Math.PI / 180) * 60) // 旋转60度
    mesh3.rotateY((Math.PI / 180) * 120) // 旋转120度
    return [mesh, mesh2, mesh3] // 返回三个辉光网格
  }

  /**
   * 创建光圈效果
   * @param {Vector3} position - 位置
   * @param {number} index - 索引
   * @returns {Group} 光圈组
   */
  createQuan(position, index) {
    // 获取光圈贴图
    const guangquan1 = this.assets.instance.getResource('guangquan1')
    const guangquan2 = this.assets.instance.getResource('guangquan2')
    // 创建平面几何体
    const geometry = new PlaneGeometry(0.5, 0.5)
    // 创建光圈材质1
    const material1 = new MeshBasicMaterial({
      color: 0xFFFFFF, // 白色
      map: guangquan1, // 贴图
      alphaMap: guangquan1, // 透明度贴图
      opacity: 1, // 不透明度
      transparent: true, // 启用透明度
      depthTest: false, // 禁用深度测试
      fog: false, // 禁用雾效果
      blending: AdditiveBlending, // 加法混合
    })
    // 创建光圈材质2
    const material2 = new MeshBasicMaterial({
      color: 0xFFFFFF, // 白色
      map: guangquan2, // 贴图
      alphaMap: guangquan2, // 透明度贴图
      opacity: 1, // 不透明度
      transparent: true, // 启用透明度
      depthTest: false, // 禁用深度测试
      fog: false, // 禁用雾效果
      blending: AdditiveBlending, // 加法混合
    })
    // 创建光圈网格
    const mesh1 = new Mesh(geometry, material1)
    const mesh2 = new Mesh(geometry, material2)
    mesh1.renderOrder = 6 // 设置渲染顺序
    mesh2.renderOrder = 6 // 设置渲染顺序
    mesh1.rotateX(-Math.PI / 2) // 旋转-90度
    mesh2.rotateX(-Math.PI / 2) // 旋转-90度
    mesh1.position.copy(position) // 设置位置
    mesh2.position.copy(position) // 设置位置
    mesh2.position.y -= 0.001 // 微调Y位置
    mesh1.scale.set(0, 0, 0) // 初始缩放为0
    mesh2.scale.set(0, 0, 0) // 初始缩放为0
    // 创建光圈组
    this.quanGroup = new Group()
    this.quanGroup.add(mesh1, mesh2) // 添加网格到组
    this.scene.add(this.quanGroup) // 添加到场景
    // 添加旋转动画
    this.time.on('tick', () => {
      mesh1.rotation.z += 0.05 // 每帧旋转
    })
    return this.quanGroup // 返回光圈组
  }

  /**
   * 创建扩散效果
   */
  createDiffuse() {
    // 创建大平面几何体
    const geometry = new PlaneGeometry(200, 200)
    // 创建扩散材质
    const material = new MeshBasicMaterial({
      color: 0x000000, // 黑色
      depthWrite: false, // 禁用深度写入
      transparent: true, // 启用透明度
      blending: CustomBlending, // 自定义混合模式
    })
    // 使用CustomBlending实现混合叠加
    material.blendEquation = AddEquation // 加法混合方程
    material.blendSrc = DstColorFactor // 源颜色因子
    material.blendDst = OneFactor // 目标颜色因子
    // 创建扩散着色器
    let diffuse = new DiffuseShader({
      material, // 材质
      time: this.time, // 时间对象
      size: 60, // 扩散大小
      diffuseSpeed: 8.0, // 扩散速度
      diffuseColor: 0x71918E, // 扩散颜色
      diffuseWidth: 2.0, // 扩散宽度
      callback: (pointShader) => {
        // 延迟启动动画
        setTimeout(() => {
          gsap.to(pointShader.uniforms.uTime, {
            value: 4, // 目标值
            repeat: -1, // 无限重复
            duration: 6, // 持续时间
            ease: 'power1.easeIn', // 缓动函数
          })
        }, 3)
      },
    })
    // 创建扩散网格
    const mesh = new Mesh(geometry, material)
    mesh.renderOrder = 3 // 设置渲染顺序
    mesh.rotation.x = -Math.PI / 2 // 旋转-90度
    mesh.position.set(0, 0.21, 0) // 设置位置
    this.scene.add(mesh) // 添加到场景
  }

  /**
   * 创建网格
   */
  createGrid() {
    new Grid(this, {
      gridSize: 50, // 网格大小
      gridDivision: 20, // 网格分割数
      gridColor: 0x1B4B70, // 网格颜色
      shapeSize: 0.5, // 形状大小
      shapeColor: 0x2A5F8A, // 形状颜色
      pointSize: 0.1, // 点大小
      pointColor: 0x154D7D, // 点颜色
    })
  }

  /**
   * 创建底部背景
   */
  createBottomBg() {
    // 创建平面几何体
    const geometry = new PlaneGeometry(20, 20)
    // 获取海洋贴图
    const texture = this.assets.instance.getResource('ocean')
    texture.colorSpace = SRGBColorSpace // 设置颜色空间
    texture.wrapS = RepeatWrapping // 设置S方向重复包裹
    texture.wrapT = RepeatWrapping // 设置T方向重复包裹
    texture.repeat.set(1, 1) // 设置重复次数
    // 创建底部背景材质
    const material = new MeshBasicMaterial({
      map: texture, // 海洋贴图
      opacity: 1, // 不透明度
      fog: false, // 禁用雾效果
    })
    // 创建底部背景网格
    const mesh = new Mesh(geometry, material)
    mesh.rotation.x = -Math.PI / 2 // 旋转-90度
    mesh.position.set(0, -0.7, 0) // 设置位置
    this.scene.add(mesh) // 添加到场景
  }

  /**
   * 创建中国模糊边线
   */
  createChinaBlurLine() {
    // 创建平面几何体
    const geometry = new PlaneGeometry(147, 147)
    // 获取中国模糊边线贴图
    const texture = this.assets.instance.getResource('chinaBlurLine')
    texture.colorSpace = SRGBColorSpace // 设置颜色空间
    texture.wrapS = RepeatWrapping // 设置S方向重复包裹
    texture.wrapT = RepeatWrapping // 设置T方向重复包裹
    texture.generateMipmaps = false // 禁用Mipmap生成
    texture.minFilter = NearestFilter // 设置最小过滤
    texture.repeat.set(1, 1) // 设置重复次数
    // 创建模糊边线材质
    const material = new MeshBasicMaterial({
      color: 0x3F82CD, // 蓝色
      alphaMap: texture, // 透明度贴图
      transparent: true, // 启用透明度
      opacity: 0.5, // 不透明度
    })
    // 创建模糊边线网格
    const mesh = new Mesh(geometry, material)
    mesh.rotateX(-Math.PI / 2) // 旋转-90度
    mesh.position.set(-19.3, -0.5, -19.7) // 设置位置
    this.scene.add(mesh) // 添加到场景
  }

  /**
   * 创建标签
   */
  createLabel() {
    const self = this // 保存this引用
    const labelGroup = this.labelGroup // 标签组
    const label3d = this.label3d // 3D标签管理器
    const otherLabel = [] // 其他标签数组
    // 遍历中国数据创建省份标签
    chinaData.map((province) => {
      if (province.hide === true) // 如果隐藏则跳过
        return false
      const label = labelStyle01(province, label3d, labelGroup) // 创建标签
      otherLabel.push(label) // 添加到数组
    })
    // 创建地图焦点标签
    const mapFocusLabel = labelStyle02(
      {
        ...this.mapFocusLabelInfo, // 展开焦点标签信息
      },
      label3d,
      labelGroup,
    )
    // 创建图标标签1
    const iconLabel1 = labelStyle03(
      {
        icon: labelIcon, // 图标
        center: [118.280637, 21.625178], // 中心坐标
        width: '40px', // 宽度
        height: '40px', // 高度
        reflect: true, // 启用反射
      },
      label3d,
      labelGroup,
    )
    // 创建图标标签2
    const iconLabel2 = labelStyle03(
      {
        icon: labelIcon, // 图标
        center: [106.280637, 25.625178], // 中心坐标
        width: '20px', // 宽度
        height: '20px', // 高度
        reflect: false, // 禁用反射
      },
      label3d,
      labelGroup,
    )
    // 添加所有标签到数组
    otherLabel.push(mapFocusLabel)
    otherLabel.push(iconLabel1)
    otherLabel.push(iconLabel2)
    this.otherLabel = otherLabel // 保存标签数组
    /**
     * 创建省份标签样式1
     * @param {object} province - 省份数据
     * @param {object} label3d - 3D标签管理器
     * @param {Group} labelGroup - 标签组
     * @returns {object} 标签对象
     */
    function labelStyle01(province, label3d, labelGroup) {
      const label = label3d.create('', `china-label ${province.blur ? ' blur' : ''}`, false) // 创建标签
      const [x, y] = self.geoProjection(province.center) // 投影坐标
      label.init(
        `<div class="other-label"><img class="label-icon" src="${labelIcon}">${province.name}</div>`, // 标签内容
        new Vector3(x, -y, 0.4), // 标签位置
      )
      label3d.setLabelStyle(label, 0.02, 'x') // 设置标签样式
      label.setParent(labelGroup) // 设置父级
      return label // 返回标签对象
    }
    /**
     * 创建地图焦点标签样式2
     * @param {object} province - 省份数据
     * @param {object} label3d - 3D标签管理器
     * @param {Group} labelGroup - 标签组
     * @returns {object} 标签对象
     */
    function labelStyle02(province, label3d, labelGroup) {
      const label = label3d.create('', 'map-label', false) // 创建标签
      const [x, y] = self.geoProjection(province.center) // 投影坐标
      label.init(
        `<div class="other-label"><span>${province.name}</span><span>${province.enName}</span></div>`, // 标签内容
        new Vector3(x, -y, 0.4), // 标签位置
      )
      label3d.setLabelStyle(label, 0.015, 'x') // 设置标签样式
      label.setParent(labelGroup) // 设置父级
      return label // 返回标签对象
    }
    /**
     * 创建装饰标签样式3
     * @param {object} data - 数据对象
     * @param {object} label3d - 3D标签管理器
     * @param {Group} labelGroup - 标签组
     * @returns {object} 标签对象
     */
    function labelStyle03(data, label3d, labelGroup) {
      const label = label3d.create('', `decoration-label  ${data.reflect ? ' reflect' : ''}`, false) // 创建标签
      const [x, y] = self.geoProjection(data.center) // 投影坐标
      label.init(
        `<div class="other-label"><img class="label-icon" style="width:${data.width};height:${data.height}" src="${data.icon}">`, // 标签内容
        new Vector3(x, -y, 0.4), // 标签位置
      )
      label3d.setLabelStyle(label, 0.02, 'x') // 设置标签样式
      label.setParent(labelGroup) // 设置父级
      return label // 返回标签对象
    }
    function labelStyle04(data, label3d, labelGroup, index) {
      const label = label3d.create('', 'provinces-label', false)
      const [x, y] = self.geoProjection(data.center)
      label.init(
        `<div class="provinces-label">
      <div class="provinces-label-wrap">
        <div class="number">${data.value}<span>件</span></div>
        <div class="name">
          <span class="zh">${data.name}</span>
          <span class="en">${data.enName.toUpperCase()}</span>
        </div>
        <div class="no">${index + 1}</div>
      </div>
    </div>`,
        new Vector3(x, -y, 2.4),
      )
      label3d.setLabelStyle(label, 0.02, 'x')
      label.setParent(labelGroup)
      return label
    }
  }

  /**
   * 创建旋转边框
   */
  createRotateBorder() {
    const max = 12 // 最大尺寸
    // 获取旋转边框贴图
    const rotationBorder1 = this.assets.instance.getResource('rotationBorder1')
    const rotationBorder2 = this.assets.instance.getResource('rotationBorder2')
    // 创建第一个旋转平面 （外圈 ）
    const plane01 = new Plane(this, {
      // width: max * 1.85, // 宽度
      width: max * 1.35, // 宽度

      needRotate: true, // 需要旋转
      rotateSpeed: 0.001, // 旋转速度
      material: new MeshBasicMaterial({
        map: rotationBorder1, // 贴图
        color: 0x48AFFF, // 颜色
        transparent: true, // 启用透明度
        opacity: 0.2, // 不透明度
        side: DoubleSide, // 双面材质
        depthWrite: false, // 禁用深度写入
        blending: AdditiveBlending, // 加法混合
      }),
      position: new Vector3(0, 0.28, 0), // 位置
    })
    plane01.instance.rotation.x = -Math.PI / 2 // 旋转-90度
    plane01.instance.renderOrder = 6 // 设置渲染顺序
    plane01.instance.scale.set(0, 0, 0) // 初始缩放为0
    plane01.setParent(this.scene) // 设置父级
    // 创建第二个旋转平面 （内圈）
    const plane02 = new Plane(this, {
      // width: max * 1.7, // 宽度
      width: max * 1.25, // 宽度

      needRotate: true, // 需要旋转
      rotateSpeed: -0.004, // 旋转速度（反向）
      material: new MeshBasicMaterial({
        map: rotationBorder2, // 贴图
        color: 0x48AFFF, // 颜色
        transparent: true, // 启用透明度
        opacity: 0.4, // 不透明度
        side: DoubleSide, // 双面材质
        depthWrite: false, // 禁用深度写入
        blending: AdditiveBlending, // 加法混合
      }),
      position: new Vector3(0, 0.3, 0), // 位置
    })
    plane02.instance.rotation.x = -Math.PI / 2 // 旋转-90度
    plane02.instance.renderOrder = 6 // 设置渲染顺序
    plane02.instance.scale.set(0, 0, 0) // 初始缩放为0
    plane02.setParent(this.scene) // 设置父级
    // 保存引用
    this.rotateBorder1 = plane01.instance
    this.rotateBorder2 = plane02.instance
  }

  /**
   * 创建飞线
   */
  createFlyLine() {
    this.flyLineGroup = new Group() // 创建飞线组
    this.flyLineGroup.visible = false // 初始隐藏
    this.scene.add(this.flyLineGroup) // 添加到场景
    // 获取飞线贴图
    const texture = this.assets.instance.getResource('mapFlyline')
    texture.wrapS = texture.wrapT = RepeatWrapping // 设置重复包裹
    texture.repeat.set(0.5, 2) // 设置重复次数
    // 飞线参数
    const tubeRadius = 0.1 // 管道半径
    const tubeSegments = 32 // 管道段数
    const tubeRadialSegments = 2 // 径向段数
    const closed = false // 是否闭合
    // 计算中心点
    const [centerX, centerY] = this.geoProjection(this.flyLineCenter)
    const centerPoint = new Vector3(centerX, -centerY, 0)
    // 创建飞线材质
    const material = new MeshBasicMaterial({
      map: texture, // 贴图
      color: 0x2A6F72, // 颜色
      transparent: true, // 启用透明度
      fog: false, // 禁用雾效果
      opacity: 1, // 不透明度
      depthTest: false, // 禁用深度测试
      blending: AdditiveBlending, // 加法混合
    })
    // 添加贴图滚动动画
    this.time.on('tick', () => {
      texture.offset.x -= 0.006 // 每帧移动贴图
    })
    // 遍历前7个省份创建飞线
    provincesData
      .filter((item, index) => index < 15) // 过滤前7个
      .map((city) => {
        const [x, y] = this.geoProjection(city.centroid) // 投影坐标
        const point = new Vector3(x, -y, 0) // 目标点
        const center = new Vector3() // 中心点
        center.addVectors(centerPoint, point).multiplyScalar(0.5) // 计算中心
        center.setZ(3) // 设置Z坐标
        // 创建贝塞尔曲线
        const curve = new QuadraticBezierCurve3(centerPoint, center, point)
        // 创建管道几何体
        const tubeGeometry = new TubeGeometry(curve, tubeSegments, tubeRadius, tubeRadialSegments, closed)
        // 创建飞线网格
        const mesh = new Mesh(tubeGeometry, material)
        mesh.rotation.x = -Math.PI / 2 // 旋转-90度
        mesh.position.set(0, this.depth + 0.44, 0) // 设置位置
        mesh.renderOrder = 21 // 设置渲染顺序
        this.flyLineGroup.add(mesh) // 添加到飞线组
      })
  }

  /**
   * 创建焦点效果
   */
  createFocus() {
    // 创建焦点对象
    const focusObj = new Focus(this, { color1: 0xBDFDFD, color2: 0xBDFDFD }) // 焦点颜色
    const [x, y] = this.geoProjection(this.flyLineCenter) // 投影坐标
    focusObj.position.set(x, -y, this.depth + 0.44) // 设置位置
    focusObj.scale.set(1, 1, 1) // 设置缩放
    this.flyLineFocusGroup.add(focusObj) // 添加到飞线焦点组
  }

  /**
   * 创建粒子系统
   */
  createParticles() {
    // 创建粒子系统
    this.particles = new Particles(this, {
      num: 10, // 粒子数量
      range: 30, // 范围
      dir: 'up', // 方向
      speed: 0.05, // 速度
      material: new PointsMaterial({
        map: Particles.createTexture(), // 粒子贴图
        size: 1, // 大小
        color: 0x00EEEE, // 颜色
        transparent: true, // 启用透明度
        opacity: 1, // 不透明度
        depthTest: false, // 禁用深度测试
        depthWrite: false, // 禁用深度写入
        vertexColors: true, // 启用顶点颜色
        blending: AdditiveBlending, // 加法混合
        sizeAttenuation: true, // 启用大小衰减
      }),
    })
    // 创建粒子组
    this.particleGroup = new Group()
    this.scene.add(this.particleGroup) // 添加到场景
    this.particleGroup.rotation.x = -Math.PI / 2 // 旋转-90度
    this.particles.setParent(this.particleGroup) // 设置父级
    this.particles.enable = true // 启用粒子
    this.particleGroup.visible = true // 显示粒子组
  }

  /**
   * 创建散点图
   */
  createScatter() {
    this.scatterGroup = new Group() // 创建散点组
    this.scatterGroup.visible = false // 初始隐藏
    this.scatterGroup.rotation.x = -Math.PI / 2 // 旋转-90度
    this.scene.add(this.scatterGroup) // 添加到场景
    // 获取箭头贴图
    const texture = this.assets.instance.getResource('arrow')
    // 创建精灵材质
    const material = new SpriteMaterial({
      map: texture, // 贴图
      color: 0xFFFEF4, // 颜色
      fog: false, // 禁用雾效果
      transparent: true, // 启用透明度
      depthTest: false, // 禁用深度测试
    })
    // 获取散点数据并按值排序
    const scatterAllData = sortByValue(scatterData)
    const max = scatterAllData[0].value // 最大值
    // 遍历数据创建散点
    scatterAllData.map((data) => {
      const sprite = new Sprite(material) // 创建精灵
      sprite.renderOrder = 23 // 设置渲染顺序
      const scale = 0.1 + (data.value / max) * 0.2 // 计算缩放
      sprite.scale.set(scale, scale, scale) // 设置缩放
      const [x, y] = this.geoProjection([data.lng, data.lat]) // 投影坐标
      sprite.position.set(x, -y, this.depth + 0.45) // 设置位置
      sprite.userData.position = [x, -y, this.depth + 0.45] // 保存位置数据
      this.scatterGroup.add(sprite) // 添加到散点组
    })
  }

  /**
   * 创建信息点
   */
  createInfoPoint() {
    const self = this // 保存this引用
    this.InfoPointGroup = new Group() // 创建信息点组
    this.scene.add(this.InfoPointGroup) // 添加到场景
    this.InfoPointGroup.visible = false // 初始隐藏
    this.InfoPointGroup.rotation.x = -Math.PI / 2 // 旋转-90度
    this.infoPointIndex = 0 // 信息点索引
    this.infoPointLabelTime = null // 信息点标签时间
    this.infoLabelElement = [] // 信息标签元素数组
    const label3d = this.label3d // 3D标签管理器
    // 获取点贴图
    const texture = this.assets.instance.getResource('point')
    const colors = [0xFFFEF4, 0x77FBF5] // 颜色数组
    // 获取信息数据并按值排序
    const infoAllData = sortByValue(infoData)
    const max = infoAllData[0].value // 最大值
    // 遍历数据创建信息点
    infoAllData.map((data, index) => {
      // 创建精灵材质
      const material = new SpriteMaterial({
        map: texture, // 贴图
        color: colors[index % colors.length], // 颜色
        fog: false, // 禁用雾效果
        transparent: true, // 启用透明度
        depthTest: false, // 禁用深度测试
      })
      // 创建精灵
      const sprite = new Sprite(material)
      sprite.renderOrder = 23 // 设置渲染顺序
      const scale = 0.7 + (data.value / max) * 0.4 // 计算缩放
      sprite.scale.set(scale, scale, scale) // 设置缩放
      const [x, y] = this.geoProjection([data.lng, data.lat]) // 投影坐标
      const position = [x, -y, this.depth + 0.7] // 位置
      sprite.position.set(...position) // 设置位置
      sprite.userData.position = [...position] // 保存位置数据
      sprite.userData = {
        position: [x, -y, this.depth + 0.7], // 位置
        name: data.name, // 名称
        value: data.value, // 值
        level: data.level, // 等级
        index, // 索引
      }
      this.InfoPointGroup.add(sprite) // 添加到信息点组
      // 创建信息标签
      const label = infoLabel(data, label3d, this.InfoPointGroup)
      this.infoLabelElement.push(label) // 添加到标签数组
      this.interactionManager.add(sprite) // 添加到交互管理器
      // 鼠标按下事件
      sprite.addEventListener('mousedown', (ev) => {
        if (this.clicked || !this.InfoPointGroup.visible) // 如果已点击或不可见则返回
          return false
        this.clicked = true // 设置点击状态
        this.infoPointIndex = ev.target.userData.index // 设置信息点索引
        this.infoLabelElement.map((label) => {
          label.visible = false // 隐藏所有标签
        })
        label.visible = true // 显示当前标签
        this.createInfoPointLabelLoop() // 创建信息点标签循环
      })
      // 鼠标抬起事件
      sprite.addEventListener('mouseup', (ev) => {
        this.clicked = false // 重置点击状态
      })
      // 鼠标悬停事件
      sprite.addEventListener('mouseover', (event) => {
        document.body.style.cursor = 'pointer' // 设置鼠标样式
      })
      // 鼠标离开事件
      sprite.addEventListener('mouseout', (event) => {
        document.body.style.cursor = 'default' // 恢复鼠标样式
      })
    })
    function infoLabel(data, label3d, labelGroup) {
      const label = label3d.create('', 'info-point', true)
      const [x, y] = self.geoProjection([data.lng, data.lat])
      label.init(
        ` <div class="info-point-wrap">
          <div class="info-point-wrap-inner">
            <div class="info-point-line">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
            <div class="info-point-content">
              <div class="content-item"><span class="label">名称</span><span class="value">${data.name}</span></div>
              <div class="content-item"><span class="label">风险指数</span><span class="value">${data.value}</span></div>
              <div class="content-item"><span class="label">等级</span><span class="value">${data.level}</span></div>
            </div>
          </div>
        </div>
      `,
        new Vector3(x, -y, self.depth + 1.9),
      )
      label3d.setLabelStyle(label, 0.015, 'x')
      label.setParent(labelGroup)
      label.visible = false
      return label
    }
  }

  /**
   * 创建信息点标签循环
   */
  createInfoPointLabelLoop() {
    clearInterval(this.infoPointLabelTime) // 清除之前的定时器
    this.infoPointLabelTime = setInterval(() => {
      this.infoPointIndex++ // 增加索引
      if (this.infoPointIndex >= this.infoLabelElement.length) {
        this.infoPointIndex = 0 // 重置索引
      }
      // 遍历标签元素
      this.infoLabelElement.map((label, i) => {
        if (this.infoPointIndex === i) {
          label.visible = true // 显示当前标签
        }
        else {
          label.visible = false // 隐藏其他标签
        }
      })
    }, 3000) // 每3秒切换一次
  }

  /**
   * 创建轮廓线
   */
  createStorke() {
    // 获取地图轮廓数据
    const mapStroke = this.assets.instance.getResource('mapStroke')
    // 获取路径线贴图
    const texture = this.assets.instance.getResource('pathLine3')
    texture.wrapS = texture.wrapT = RepeatWrapping // 设置重复包裹
    texture.repeat.set(2, 1) // 设置重复次数

    // 创建路径线
    const pathLine = new Line(this, {
      geoProjectionCenter: this.geoProjectionCenter, // 投影中心
      geoProjectionScale: this.geoProjectionScale, // 投影缩放
      position: new Vector3(0, 0, this.depth + 0.24), // 位置
      data: mapStroke, // 轮廓数据
      material: new MeshBasicMaterial({
        color: 0x2BC4DC, // 颜色
        map: texture, // 贴图
        alphaMap: texture, // 透明度贴图
        fog: false, // 禁用雾效果
        transparent: true, // 启用透明度
        opacity: 1, // 不透明度
        blending: AdditiveBlending, // 加法混合
      }),
      type: 'Line3', // 线条类型
      renderOrder: 22, // 渲染顺序
      tubeRadius: 0.03, // 管道半径
    })
    // 设置父级
    this.focusMapGroup.add(pathLine.lineGroup) // 添加到焦点地图组
    // 添加贴图滚动动画
    this.time.on('tick', () => {
      texture.offset.x += 0.005 // 每帧移动贴图
    })
  }

  /**
   * 地理投影转换
   * @param {Array} args - 经纬度坐标 [经度, 纬度]
   * @returns {Array} 投影后的坐标 [x, y]
   */
  geoProjection(args) {
    return geoMercator() // 使用墨卡托投影
      .center(this.geoProjectionCenter) // 设置投影中心
      .scale(this.geoProjectionScale) // 设置缩放比例
      .translate([0, 0]) // 设置平移
      (args) // 执行投影转换
  }

  /**
   * 更新场景
   */
  update() {
    super.update() // 调用父类更新方法
    this.interactionManager && this.interactionManager.update() // 更新交互管理器
  }

  /**
   * 销毁场景
   */
  destroy() {
    super.destroy() // 调用父类销毁方法
    this.label3d && this.label3d.destroy() // 销毁 3D 标签管理器
  }
}
