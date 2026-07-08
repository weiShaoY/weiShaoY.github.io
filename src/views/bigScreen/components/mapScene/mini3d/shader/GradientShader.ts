import type { Material } from 'three'

import { Color } from 'three'

/**
 * 着色器类型
 */
type Shader = {
  uniforms: any
  vertexShader: string
  fragmentShader: string
}

/**
 * 渐变着色器配置类型
 */
type GradientShaderConfig = {

  /**
   * 颜色1
   */
  uColor1?: number

  /**
   * 颜色2
   */
  uColor2?: number

  /**
   * 大小
   */
  size?: number

  /**
   * 方向 ('x', 'y', 'z')
   */
  dir?: 'x' | 'y' | 'z'
}

/**
 * 渐变着色器选项类型
 */
type GradientShaderOptions = {

  /**
   * 颜色1
   */
  uColor1: number

  /**
   * 颜色2
   */
  uColor2: number

  /**
   * 大小
   */
  size: number

  /**
   * 方向 ('x', 'y', 'z')
   */
  dir: 'x' | 'y' | 'z'
}

/**
 * 渐变着色器类
 * @description 负责管理渐变着色器的实例和相关配置
 * @description 提供设置实例、初始化、更新和销毁的方法
 * @description 支持渐变着色器的创建和销毁
 */
export class GradientShader {
  /**
   * 着色器对象
   */
  public shader: Shader | null

  /**
   * 配置对象
   */
  public config: GradientShaderOptions

  /**
   * 构造函数
   * @param material - 材质对象
   * @param config - 配置对象
   */
  constructor(material: Material, config: GradientShaderConfig = {
  }) {
    this.shader = null
    this.config = Object.assign(
      {
        uColor1: 0x2A6F72,
        uColor2: 0x0D2025,
        size: 15.0,
        dir: 'x', // 'x', 'y', 'z'
      },
      config,
    ) as GradientShaderOptions
    this.init(material)
  }

  /**
   * 初始化着色器
   * @param material - 材质对象
   */
  init(material: Material): void {
    const { uColor1, uColor2, dir, size } = this.config

    const dirMap: Record<'x' | 'y' | 'z', number> = {
      x: 1.0,
      y: 2.0,
      z: 3.0,
    }

    material.onBeforeCompile = (shader: Shader) => {
      this.shader = shader

      shader.uniforms = {
        ...shader.uniforms,
        uColor1: {
          value: new Color(uColor1),
        }, // 419daa
        uColor2: {
          value: new Color(uColor2),
        },
        uDir: {
          value: dirMap[dir],
        },
        uSize: {
          value: size,
        }, // 物体的宽度，或者高度
      }
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        `
                attribute float alpha;
                varying vec3 vPosition;
                varying float vAlpha;
                void main() {
                  vAlpha = alpha;
                  vPosition = position;
              `,
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
                varying vec3 vPosition;
                varying float vAlpha;
                uniform vec3 uColor1;
                uniform vec3 uColor2;
                uniform float uDir;
                uniform float uSize;

                void main() {
              `,
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        /* glsl */ `
              #ifdef OPAQUE
              diffuseColor.a = 1.0;
              #endif

              // https://github.com/mrdoob/three.js/pull/22425
              #ifdef USE_TRANSMISSION
              diffuseColor.a *= transmissionAlpha + 0.1;
              #endif
              // vec3 gradient = mix(uColor1, uColor2, vPosition.x / 15.0);
              vec3 gradient = vec3(0.0,0.0,0.0);
              if(uDir==1.0){
                gradient = mix(uColor1, uColor2, vPosition.x/ uSize);
              }else if(uDir==2.0){
                gradient = mix(uColor1, uColor2, vPosition.z/ uSize);
              }else if(uDir==3.0){
                gradient = mix(uColor1, uColor2, vPosition.y/ uSize);
              }
              outgoingLight = outgoingLight * gradient;


              gl_FragColor = vec4( outgoingLight, diffuseColor.a  );
              `,
      )
    }

    // console.log(material)
  }
}
