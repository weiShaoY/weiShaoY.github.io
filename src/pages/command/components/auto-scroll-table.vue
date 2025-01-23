<script lang="ts" setup>
import { vue3ScrollSeamless } from 'vue3-scroll-seamless'

export type Headers = {
  key: string
  style: object
  title: string
}

/**
 * 滚动相关的配置选项
 */
 type ClassOption = {

   /**
    * 滚动步长
    * @description 数值越大，滚动速度越快
    * @default 1
    */
   step?: number

   /**
    * 限制滚动数据的数量
    * @description 数据超过该数量时才开始滚动
    * @default Infinity
    */
   limitMoveNum?: number

   /**
    * 是否在鼠标悬停时停止滚动
    * @description 如果为 true，当鼠标悬停时会停止滚动
    * @default false
    */
   hoverStop?: boolean

   /**
    * 滚动方向
    * @description 指定滚动的方向，可选值为 'up', 'down', 'left', 'right'
    * @default 'up'
    */
   direction?: string

   /**
    * 单步滚动的高度
    * @description 仅在方向为 'up' 或 'down' 时生效
    * @default 0
    */
   singleHeight?: number

   /**
    * 单步滚动的等待时间（毫秒）
    * @description 在每次滚动之间等待的时间
    * @default 1000
    */
   waitTime?: number

   /**
    * 滚动切换的延迟时间（毫秒）
    * @description 在滚动切换时延迟的时间
    * @default 0
    */
   switchDelay?: number
 }

/**
 * 表格组件的属性定义
 */
type Props = {

  /**
   * 表头数组
   * @description 定义表格的表头信息
   */
  headers: {
    key: string
    style: object
    title: string
  }[]

  /**
   * 表格数据行
   * @description 每一行数据是一个对象，key 为列的标识，value 为对应的值
   */
  rows: { [key: string]: string }[]

  /**
   * 是否自动滚动
   * @description 如果为 true，表格将自动滚动
   */
  scrollAuto: boolean

  /**
   * 表格高度
   * @description 设置表格的高度，可以为字符串或数值
   */
  height?: string | number

  /**
   * 滚动类的配置选项
   * @description 传递到滚动实现的额外配置
   */
  classOptions: object
} & ClassOption
const props = withDefaults(defineProps<Props>(), {
  scrollAuto: true,
})

console.log('%c Line:104 🥖 props', 'color:#ed9ec7', props)
const defaultClassOption = Object.assign(
  {
    limitMoveNum: 6,
    direction: 1,
    hoverStop: true,
    step: 1,
  },
  props.classOptions,
)
</script>

<template>
  <div
    class="auto-scroll-table"
    :style="{ height: props.height ? `${props.height}px` : '100%' }"
  >
    <div
      v-if="props.headers.length"
      class="thead h-[28px] w-[100%] flex px-[16px] py-[6px] text-[12px] color-[#4EA4FF] font-medium"
    >
      <div
        v-for="th in props.headers.filter((item) => item.key !== 'id')"
        :key="th?.key"
        class="flex-1"
        :style="{
          ...(th.style ? th?.style : {}),
        }"
      >
        {{ th?.title }}
      </div>
    </div>
    <!-- 这一层是tr -->
    <template
      v-if="props.rows.length"
    >
      2222222

      <div
        v-if="props.scrollAuto"
        class="tbody"
      >

        <vue3ScrollSeamless
          class="scroll-wrap"
          :class-options="defaultClassOption"
          :data-list="props.rows"
        >
          <div
            v-for="row in props.rows"
            :key="row?.id"
            class="tr flex px-[16px] py-[6px] text-[12px]"
          >
            <div
              v-for="th in props.headers.filter((item) => item.key !== 'id')"
              :key="th.key"
              class="td flex-1"
              :style="{
                ...(th?.style ? th.style : {}),
              }"
            >
              {{ row[th?.key] }}
            </div>
          </div>
        </vue3ScrollSeamless>
      </div>

      <div
        v-else
        class="tbody overflow-y-auto"
      >
        <div
          v-for="row in props.rows"
          :key="row.id"
          class="tr flex px-[16px] py-[6px] text-[12px]"
        >
          <div
            v-for="th in props.headers.filter((item) => item.key !== 'id')"
            :key="th.key"
            class="td flex-1"
          >
            {{ row[th.key] }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
  .thead {
  background-color: rgba(78, 164, 255, 0.2);
}
.tr:nth-child(2n) {
  background-color: rgba(78, 164, 255, 0.1);
}
.td {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis; //文本溢出显示省略号
  white-space: nowrap; //文本不会换行
}
.scroll-wrap {
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.tbody {
  height: 90%;
}
</style>
