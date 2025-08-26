<script setup>

import mCountTo from '@/components/BigScreen/mCountTo/index.js'

import Pie from './pie.vue'

const pie = ref(null)

const state = ref({
  pieDataColor: ['#17E6C3', '#40CFFF', '#1979FF', '#FFC472'],
  pieData: [
    {
      name: '类型1',
      value: 400,
    },
    {
      name: '类型2',
      value: 250,
    },
    {
      name: '类型3',
      value: 200,
    },
    {
      name: '类型4',
      value: 150,
    },
  ],
})

function getNumber(slotProps) {
  return Number(((slotProps.data.value / slotProps.data.count) * 100).toFixed(2))
}

</script>

<template>
  <div
    class="left-card mb-3 flex-1"
  >
    <m-card
      title="年度经济增长点"
    >
      <div
        class="pie-chat-wrap h-full w-full flex"
      >
        <div
          class="pie-chat pointer-events-auto relative h-full w-[236px]"
        >
          <Pie
            ref="pie"
            :data="state.pieData"
            :delay="3000"
            :colors="state.pieDataColor"
            :opacity="0.6"
            class="pieCanvas pointer-events-auto h-full w-full"
          >
            <template
              #default="slotProps"
            >
              <div
                class="pieCanvas-content mb-8 h-full w-full flex flex-col items-center justify-center text-xs text-white"
              >
                <div
                  class="pieCanvas-content-value text-4 font-bold text-shadow-[0_0_10px_rgb(0_0_0)]"
                >
                  <mCountTo
                    :start-val="0"
                    :end-val="getNumber(slotProps)"
                    :decimals="2"
                    :duration="1000"
                    :autoplay="true"
                  />
                  %
                </div>

                <div
                  class="pieCanvas-content-name w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs text-white"
                >
                  {{ slotProps.data.name }}
                </div>
              </div>
            </template>
          </Pie>
        </div>

        <div
          class="pie-legend flex flex-col flex-wrap items-center justify-between px-0 py-5"
        >
          <div
            v-for="(item, index) in state.pieData"
            :key="index"
            class="pie-legend-item box-border flex flex-nowrap items-center"
          >
            <div
              class="icon mr-2.5 box-border h-2.5 w-2.5 border-2 border-[#17e6c3] rounded-3 border-solid"
              :style="{ borderColor: state.pieDataColor[index] }"
            />

            <div
              class="name text-xs text-white font-medium"
            >
              {{ item.name }}
            </div>

            <div
              class="value w-20 flex flex-nowrap items-end justify-end text-right text-base text-white font-bold"
            >
              <span>
                {{ item.value }}
              </span>

              <span
                class="unit pl-3 text-xs text-white font-normal opacity-50"
              >
                亿
              </span>
            </div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<style lang="scss">

</style>
