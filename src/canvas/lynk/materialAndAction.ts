import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import * as THREE from 'three'

import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader'

import { KTXLoader } from 'three/examples/jsm/loaders/KTXLoader'

const config = {
  body_colors: {
    colors: [
      {
        name: 'Arancio Atlas',
        value: '#F77F21',
      },
      {
        name: 'Arancio Argos',
        value: '#FC4705',
      },
      {
        name: 'Blu Cepheus',
        value: '#4393E6',
      },
      {
        name: 'Rosso Mars',
        value: '#BF0012',
      },
      {
        name: 'Bianco Monocerus',
        value: '#F2F3F5',
      },
      {
        name: 'Pink',
        value: '#D24A57',
      },
    ],
    target: 'Mt_Body',
  },
  mirror_colors: {
    colors: [
      {
        name: 'Black',
        value: '#121212',
      },
    ],
    target: 'Mt_MirrorCover',
  },
  wheel_designs: {
    designs: [
      {
        name: 'Type A',
        value: 'Obj_Rim_T0A',
        thumb: 'Render_Tyre_0A.png',
      },
      {
        name: 'Type B',
        value: 'Obj_Rim_T0B',
        thumb: 'Render_Tyre_0B.png',
      },
    ],
  },
  wheel_colors: {
    colors: [
      {
        name: 'Black',
        value: '#000000',
      },
      {
        name: 'Grey',
        value: '#4C5457',
      },
      {
        name: 'Metalic',
        value: '#dddddd',
      },
    ],
    target: 'Mt_AlloyWheels',
  },

  caliper_colors: {
    colors: [
      {
        name: 'Red',
        value: '#990000',
      },
      {
        name: 'Yellow',
        value: '#E9A435',
      },
      {
        name: 'Black',
        value: '#000000',
      },
      {
        name: 'White',
        value: '#F1F7F7',
      },
    ],
    target: 'Mt_BrakeCaliper',
  },
}

const r = '/models/lynk/env/cubemap/'

const urls = [
  `${r}posx.jpg`,
  `${r}negx.jpg`,
  `${r}posy.jpg`,
  `${r}negy.jpg`,
  `${r}posz.jpg`,
  `${r}negz.jpg`,
]

const mCubeMap = new THREE.CubeTextureLoader().load(urls)

mCubeMap.format = THREE.RGBAFormat

mCubeMap.mapping = THREE.CubeReflectionMapping

const mManager = new THREE.LoadingManager()

const mTextureLoader = new THREE.TextureLoader(mManager)

const mDDSLoader = new DDSLoader(mManager)

const mKTXLoader = new KTXLoader(mManager)

const dfCol_Body = webColorToHex(config.body_colors.colors[5].value)

const dfCol_Mirror = webColorToHex(config.mirror_colors.colors[0].value)

const dfCol_Alloys = webColorToHex(config.wheel_colors.colors[2].value)

const dfCol_Caliper = webColorToHex(config.caliper_colors.colors[0].value)

// 默认使用dds加载器加载dds纹理
const Tire_A02_s3tc = LoadTextureCorrected(
  mDDSLoader,
  '/models/lynk/texture/Tire_A02-dxt.dds',
)

const Tire_N02_s3tc = LoadTextureCorrected(
  mDDSLoader,
  '/models/lynk/texture/Tire_N02-dxt.dds',
)

const Tire_A02_pvr = LoadTextureCorrected(
  mKTXLoader,
  '/models/lynk/texture/Tire_A02-pvr.ktx',
)

const Tire_N02_pvr = LoadTextureCorrected(
  mKTXLoader,
  '/models/lynk/texture/Tire_N02-pvr.ktx',
)

const Tire_A02_etc1 = LoadTextureCorrected(
  mKTXLoader,
  '/models/lynk/texture/Tire_A02-etc1.ktx',
)

const Tire_N02_etc1 = LoadTextureCorrected(
  mKTXLoader,
  '/models/lynk/texture/Tire_N02-etc1.ktx',
)

const Phev_Hub06_AO = LoadTextureCorrected(
  mTextureLoader,
  '/models/lynk/texture/Phev_Hub06_AO.jpg',
)

const Alpha01 = LoadTextureCorrected(
  mDDSLoader,
  '/models/lynk/texture/Alpha01-dxt.dds',
)

const Mt_Abs_Black_Gloss = new THREE.MeshStandardMaterial({
  color: 0x000000,
  roughness: 0.0,
  metalness: 0.0,
  envMap: mCubeMap,
})

const Mt_ABS_Black_Mat = new THREE.MeshStandardMaterial({
  color: 0x000000,
  roughness: 0.5,
  metalness: 0.5,
  envMap: mCubeMap,
})

const Mt_Abs_White_Mat = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 0.0,
  metalness: 0.0,
  envMap: mCubeMap,
})

const Mt_AventadorAtlas = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 0.5,
  metalness: 0.5,
  envMap: mCubeMap,

  transparent: true,
})

const Mt_Body = new THREE.MeshStandardMaterial({
  name: 'Mt_Body',
  color: dfCol_Body,
  roughness: 0.0,
  metalness: 0.0,
  envMap: mCubeMap,
})

const Mt_Glass_Lens = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 0.0,
  metalness: 0.25,
  envMap: mCubeMap,
})

const Mt_BrakeCaliper = new THREE.MeshStandardMaterial({
  name: 'Mt_BrakeCaliper',
  color: dfCol_Caliper,
  roughness: 0.5,
  metalness: 0.5,
  envMap: mCubeMap,
})

const Mt_Chrome = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 0.0,
  metalness: 1.0,
  envMap: mCubeMap,
})

const Mt_Glass_Translucent = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 0.0,
  metalness: 1.0,
  envMap: mCubeMap,
  transparent: true,
  opacity: 0.25,
})

const Mt_Interior_Black = new THREE.MeshStandardMaterial({
  color: 0x525252,
  roughness: 0.5,
  metalness: 0.5,
  envMap: mCubeMap,
})

const Mt_Metal_Black_Glossy = new THREE.MeshStandardMaterial({
  color: 0x000000,
  roughness: 0.1,
  metalness: 0.5,
  envMap: mCubeMap,
})

const Mt_Metal_Brushed = new THREE.MeshStandardMaterial({
  color: 0x555555,
  roughness: 0.0,
  metalness: 1.0,
  envMap: mCubeMap,
})

const Mt_Mirror = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 0.0,
  metalness: 1.0,
  envMap: mCubeMap,
})

const Mt_MirrorCover = new THREE.MeshStandardMaterial({
  name: 'Mt_MirrorCover',
  color: dfCol_Body,
  roughness: 0.0,
  metalness: 0.0,
  envMap: mCubeMap,
})

const Mt_Reflector_BL = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 1.0,
  metalness: 0.0,
  envMap: mCubeMap,

})

const Mt_Reflector_RL = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 1.0,
  metalness: 0.0,
  envMap: mCubeMap,

})

const Mt_Reflector_TL = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 1.0,
  metalness: 0.0,
  envMap: mCubeMap,

  // map: LR_Turn_Albedo,
  // normalMap: LR_Generic_Normal
})

const Mt_TurnLights = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 0.5,
  metalness: 0.5,
  envMap: mCubeMap,
})

const Mt_AlloyWheels = new THREE.MeshStandardMaterial({
  name: 'Mt_AlloyWheels',
  color: dfCol_Alloys,
  roughness: 0.1,
  metalness: 0.5,
  envMap: mCubeMap,
})

const Mt_Tyres_s3tc = new THREE.MeshStandardMaterial({
  color: 0x000000,
  roughness: 0.5,
  metalness: 0.5,
  envMap: mCubeMap,
  map: Tire_A02_s3tc,
  normalMap: Tire_N02_s3tc,
})

const Mt_Tyres_pvr = new THREE.MeshStandardMaterial({
  color: 0x000000,
  roughness: 0.5,
  metalness: 0.5,
  envMap: mCubeMap,
  map: Tire_A02_pvr,
  normalMap: Tire_N02_pvr,
})

const Mt_Tyres_etc1 = new THREE.MeshStandardMaterial({
  color: 0x000000,
  roughness: 0.5,
  metalness: 0.5,
  envMap: mCubeMap,
  map: Tire_A02_etc1,
  normalMap: Tire_N02_etc1,
})

const Mt_Tyres_Hub = new THREE.MeshStandardMaterial({
  color: 0x929396,
  roughness: 0.1,
  metalness: 0.5,
  envMap: mCubeMap,
  map: Phev_Hub06_AO,
})

const Mt_WindScreens = new THREE.MeshStandardMaterial({
  color: 0x000000,
  roughness: 0.0,
  metalness: 0.0,
  envMap: mCubeMap,
  transparent: true,
  opacity: 0.7,
})

const transparentMaterial = new THREE.MeshBasicMaterial({
  alphaMap: Alpha01,
  transparent: true,
  opacity: 0,
})

// const testMaterial = new THREE.MeshStandardMaterial({
//   color: 0x9E1068,
// })

function LoadTextureCorrected(_loader: THREE.TextureLoader, _path: string) {
  const texture = _loader.load(_path)

  texture.wrapT = texture.wrapS = THREE.RepeatWrapping

  texture.repeat.y = -1

  return texture
}

function webColorToHex(color = '#000000') {
  return Number.parseInt(color.replace('#', '0x'))
}

export function addMaterialAndAction(
  gltf: GLTF,
  name: string,
  renderer: THREE.WebGLRenderer,
  options: {
    receiveShadow: boolean
    castShadow: boolean
  },
) {
  const { receiveShadow, castShadow } = options

  const obj = gltf.scene as any

  obj.name = name
  obj.receiveShadow = receiveShadow
  obj.castShadow = castShadow
  obj.traverse((child: THREE.Object3D<THREE.Object3DEventMap>) => {
    if (child instanceof THREE.Mesh) {
      const mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.Material>

      if (mesh.name.includes('EXT')) {
        switch (mesh.name) {
          case 'EXT_04':
          case 'EXT_05':
          case 'EXT_08':
          case 'EXT_10':
          case 'EXT_22':
          case 'EXT_23':
          case 'EXT_24':
          case 'EXT_25':
          case 'EXT_28':
          case 'EXT_35':
          case 'EXT_36':
          case 'EXT_37':
          case 'EXT_38':
          case 'EXT_39':
          case 'EXT_40':
          case 'EXT_42':
          case 'EXT_43':
          case 'EXT_44':
          case 'EXT_45':
          case 'EXT_46':
          case 'EXT_47':
          case 'EXT_52':
            mesh.material = Mt_ABS_Black_Mat
            break
          case 'EXT_06':
          case 'EXT_07':
          case 'EXT_34':
            mesh.material = Mt_WindScreens
            break
          case 'EXT_11':
          case 'EXT_21':
          case 'EXT_41':
          case 'EXT_48':
            mesh.material = Mt_Abs_Black_Gloss
            break
          case 'EXT_51':
            mesh.material = Mt_Body
            break
          case 'EXT_29':
            break
          case 'EXT_01':
          case 'EXT_03':
            mesh.material = Mt_Body
            break
          default:
            mesh.material = Mt_ABS_Black_Mat
            break
        }
      }

      if (mesh.name.includes('Door')) {
        const doorName = mesh.name.slice(1)

        switch (doorName) {
          case 'BDoor_03':
            mesh.material = Mt_WindScreens
            break
          case 'BDoor_02':
          case 'BDoor_04':
          case 'BDoor_07':
          case 'BDoor_08':
          case 'BDoor_09':
          case 'BDoor_10':
          case 'BDoor_14':
            mesh.material = Mt_ABS_Black_Mat
            break
          case 'BDoor_05':
            mesh.material = Mt_Body
            break
          case 'FDoor_01':
            mesh.material = Mt_Body
            break
          case 'FDoor_02':
          case 'FDoor_04':
          case 'FDoor_05':
            mesh.material = Mt_ABS_Black_Mat
            break
          case 'FDoor_08':
            mesh.material = Mt_WindScreens
            break
          case 'FDoor_09':
            mesh.material = Mt_Glass_Lens
            break
          default:
            mesh.material = Mt_ABS_Black_Mat
            break
        }
      }

      if (mesh.name.includes('Sunproof')) {
        switch (mesh.name) {
          case 'Sunproof_01':
          case 'Sunproof_03':
            mesh.material = Mt_WindScreens
            break
          default:
            mesh.material = Mt_ABS_Black_Mat
            break
        }
      }

      if (mesh.name.includes('runk')) {
        switch (mesh.name) {
          case 'Trunk_03':
          case 'Trunk_04':
            mesh.material = Mt_WindScreens
            break
          case 'Trunk_05':
          case 'Trunk_08':
          case 'Trunk_09':
          case 'Trunk_10':
          case 'Trunk_15':
          case 'Trunk_19':
          case 'Trunk_22':
          case 'Trunk_17':
          case 'Trunk_93':
            mesh.material = Mt_ABS_Black_Mat
            break
          case 'Trunk_12':
            break
          case 'Trunk_92':
            mesh.material = Mt_Body
            break
          default:
            mesh.material = Mt_Body
            break
        }
      }

      if (mesh.name.includes('Tire')) {
        switch (mesh.name) {
          case 'Tire_01':
          case 'Tire_14':
          case 'Tire_17':
            mesh.material = Mt_Body
            break
          case 'Tire_02':
          case 'Tire_08':
          case 'Tire_09':
          case 'Tire_10':
          case 'Tire_12':
            mesh.material = Mt_ABS_Black_Mat
            break
          case 'Tire_03':
          case 'Tire_05':
            mesh.material = transparentMaterial
            break
          case 'Tire_11':
            mesh.material = Mt_Tyres_Hub
            break
          case 'Tire_19': {
            const webglContext = renderer.getContext()

            const supportedExtensions = webglContext?.getSupportedExtensions()

            if (supportedExtensions) {
              if (supportedExtensions.includes('WEBGL_compressed_texture_s3tc')) {
                mesh.material = Mt_Tyres_s3tc
                break
              }

              if (supportedExtensions.includes('WEBGL_compressed_texture_pvrtc')) {
                mesh.material = Mt_Tyres_pvr
                break
              }

              if (supportedExtensions.includes('WEBGL_compressed_texture_etc1')) {
                mesh.material = Mt_Tyres_etc1
                break
              }
            }

            break
          }

          default:
            mesh.material = Mt_ABS_Black_Mat
            break
        }
      }

      if (mesh.name.includes('INT')) {
        switch (mesh.name) {
          default:
            mesh.material = Mt_ABS_Black_Mat
            break
        }
      }

      mesh.castShadow = castShadow
      mesh.receiveShadow = receiveShadow
    }
  })

  if (obj.name.includes('INT')) {
    const box = new THREE.Box3().setFromObject(obj)

    const modelY = Math.abs(box.max.y) + Math.abs(box.min.y) // 获取模型的长度

    obj.carInCameraPosition = {
      x: 0,
      y: modelY / 2 + 0.1,
      z: -0.2,
    } // 进到车内看内饰视角的相机位置
  }

  let outer: THREE.Group | null = null

  if (obj.name.includes('Door')) {
    switch (obj.name) {
      case 'LBDoor':
        outer = new THREE.Group() // 外层
        outer.name = 'LBDoorOuter'
        outer.add(obj)
        outer.position.set(0.77, 0, -0.12) // 外层往前移动50%

        obj.position.set(-0.77, 0, 0.12) // 模型往后移动50%（归到原位）
        obj.status = 'close'
        obj.outer = outer
        obj.rotateDirection = {
          rotateAxis: 'y',
          open: {
            from: {
              value: -60,
            },
            to: {
              value: 0,
            },
          },
          close: {
            from: {
              value: 0,
            },
            to: {
              value: -60,
            },
          },
        }
        break
      case 'RBDoor':
        outer = new THREE.Group()
        outer.name = 'RBDoorOuter'
        outer.add(obj)
        outer.position.set(-0.77, 0, -0.12)
        obj.position.set(0.77, 0, 0.12)
        obj.status = 'close'
        obj.outer = outer
        obj.rotateDirection = {
          rotateAxis: 'y',
          open: {
            from: {
              value: 60,
            },
            to: {
              value: 0,
            },
          },
          close: {
            from: {
              value: 0,
            },
            to: {
              value: 60,
            },
          },
        }
        break
      case 'LFDoor':
        outer = new THREE.Group()
        outer.name = 'LFDoorOuter'
        outer.add(obj)
        outer.position.set(0.78, 0, 0.75)
        obj.position.set(-0.78, 0, -0.75)
        obj.status = 'close'
        obj.outer = outer
        obj.rotateDirection = {
          rotateAxis: 'y',
          open: {
            from: {
              value: -50,
            },
            to: {
              value: 0,
            },
          },
          close: {
            from: {
              value: 0,
            },
            to: {
              value: -50,
            },
          },
        }
        break
      case 'RFDoor':
        outer = new THREE.Group()
        outer.name = 'RFDoorOuter'
        outer.add(obj)
        outer.position.set(-0.78, 0, 0.75)
        obj.position.set(0.78, 0, -0.75)
        obj.status = 'close'
        obj.outer = outer
        obj.rotateDirection = {
          rotateAxis: 'y',
          open: {
            from: {
              value: 50,
            },
            to: {
              value: 0,
            },
          },
          close: {
            from: {
              value: 0,
            },
            to: {
              value: 50,
            },
          },
        }
        break
      default:
        break
    }
  }

  if (obj.name.includes('Trunk')) {
    outer = new THREE.Group()
    outer.name = 'TrunkOuter'
    outer.add(obj)
    outer.position.set(0, 1.42, -1.45)
    obj.position.set(0, -1.42, 1.45)
    obj.status = 'close'
    obj.outer = outer
    obj.rotateDirection = {
      rotateAxis: 'x',
      open: {
        from: {
          value: 80,
        },
        to: {
          value: 0,
        },
      },
      close: {
        from: {
          value: 0,
        },
        to: {
          value: 80,
        },
      },
    }
  }

  return {
    outer,
    obj,
  }
}
