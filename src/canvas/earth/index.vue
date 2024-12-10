<!------------------------------------  月球  ------------------------------------------------->
<script lang="ts" setup>

import earthFlyLine from 'earth-flyline'

import { onMounted, ref } from 'vue'

import world from './map/world.json'

const props = defineProps({
  /**
   *  高度
   */
  height: {
    type: [String, Number],
    default: '400px',
  },

})

/**
 * 计算 SVG 的行内样式
 */
const earthStyle = computed(() => ({
  width: typeof props.height === 'string' ? props.height : props.height,
  height: typeof props.height === 'string' ? props.height : props.height,
}))

const geoJson: any = world

earthFlyLine.registerMap('world', geoJson)

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (container.value) {
    earthFlyLine.init({
      dom: container.value,
      map: 'world',

      config: {
        textMark: {
        // 公共样式配置
          style: {
            fontSize: 38,
            color: '#fff',
          },
          data: [
            {
              position: {
                lon: 112.93,
                lat: 28.23,
              },
              text: '长沙',

              // 定制化样式配置
              // style: {
              //   fontSize: 22,
              //   color: 'red',
              // },
            },
          ],
        },
        R: 140,
        earth: {
          color: '#13162c',
        },
        mapStyle: {
          areaColor: '#2e3564',
          lineColor: '#797eff',
        },
        spriteStyle: {
          color: '#797eff',
        },
        pathStyle: {
          color: '#cd79ff',
        },
        flyLineStyle: {
          color: '#cd79ff',
        },
        scatterStyle: {
          color: '#cd79ff',
        },
        hoverRegionStyle: {
          areaColor: '#cd79ff',
        },
        regions: {
          China: {
            areaColor: '#2e3564',
          },
        },
      },
    })
  }
})
</script>

<template>
  <div
    ref="container"
    class="overflow-hidden"
    :style="earthStyle"
  />
</template>
