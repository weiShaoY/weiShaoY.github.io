<script lang="ts">
import floorFrag from '@/three/shaders/sketch/floorfrag.glsl'

import floorVertex from '@/three/shaders/sketch/floorver.glsl'

import fragmentShader from '@/three/shaders/sketch/fragment.glsl'

import vertexShader from '@/three/shaders/sketch/vertex.glsl'

import gsap from 'gsap'

import * as THREE from 'three'

import { CustomShaderMaterial } from 'three-custom-shader-material/vanilla'

import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

export default {
  name: 'Sketch3',
  props: {
    scene: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const modelRef = ref({
      wheel: [] as THREE.Mesh[],
      bodyMat: null as THREE.MeshStandardMaterial | null,
      floor: null as THREE.Mesh | null,
      lightMat: null as THREE.MeshStandardMaterial | null,
    })

    const params = ref({
      speedFactor: 0,
      initColor: new THREE.Color('#fff'),
      speedupColor: new THREE.Color('#000'),
      floorColor: new THREE.Color('#fff'),
      floorNormalSpeed: 0,
      bloomIntensity: 1,
      bloomThreshold: 0.9,
      lightOpacity: 1,
      floorEnvIntensity: 0,
      wheelRoughness: 1,
      wheelEnvIntensity: 5,
    })

    const uniforms = {
      uTime: new THREE.Uniform(0),
      uSpeedFactor: new THREE.Uniform(0),
    }

    const floorUniforms = {
      uColor: new THREE.Uniform(new THREE.Color('white')),
      uReflectMatrix: new THREE.Uniform(new THREE.Matrix4()),
      uReflectTexture: new THREE.Uniform(new THREE.Texture()),
      uReflectIntensity: new THREE.Uniform(15),
      uIntensity: new THREE.Uniform(1),
      uLevel: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(new THREE.Vector2()),
      uTime: new THREE.Uniform(0),
    }

    const init = () => {
      // 加载您的模型和纹理资源，并将它们添加到场景中
      loadResources()

      // 配置动画
      configureAnimations()
    }

    const loadResources = () => {
      // 示例代码：加载模型和纹理
      const loader = new THREE.GLTFLoader()

      loader.load('/models/sm_car.gltf', (gltf) => {
        props.scene.add(gltf.scene)
        modelRef.value.bodyMat = gltf.scene.children[0].material
      })
      loader.load('/models/sm_startroom.raw.gltf', (gltf) => {
        props.scene.add(gltf.scene)
      })
      loader.load('/models/sm_speedup.gltf', (gltf) => {
        props.scene.add(gltf.scene)
      })

      const textureLoader = new THREE.TextureLoader()

      const aoMap = textureLoader.load('/textures/t_car_body_AO.raw.jpg')

      const lightMap = textureLoader.load('/textures/t_startroom_light.raw.jpg')

      const startRoomAoMap = textureLoader.load('/textures/t_startroom_ao.raw.jpg')

      const floorroughnessMap = textureLoader.load('/textures/t_floor_roughness.webp')

      const floornormalMap = textureLoader.load('/textures/t_floor_normal.webp')
    }

    const configureAnimations = () => {
      // 使用 gsap 配置动画
      gsap.to(uniforms.uTime.value, {
        duration: 1,
        value: 1,
        repeat: -1,
        yoyo: true,
      })
    }

    onMounted(() => {
      init()
    })

    onUnmounted(() => {
      // 清理任何需要清理的内容
    })

    return {
    }
  },
}
</script>
