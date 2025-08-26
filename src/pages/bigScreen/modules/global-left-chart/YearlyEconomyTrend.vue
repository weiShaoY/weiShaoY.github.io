<script setup>

import mCountTo from '@/components/BgScreen/mCountTo/index.js'

import Pie from './pie.vue'

const pie = ref(null)

const state = reactive({
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
        class="pie-chat-wrap"
      >
        <div
          class="pie-chat"
        >
          <Pie
            ref="pie"
            :data="state.pieData"
            :delay="3000"
            :colors="state.pieDataColor"
            :opacity="0.6"
            class="pieCanvas"
          >
            <template
              #default="slotProps"
            >
              <div
                class="pieCanvas-content"
              >
                <div
                  class="pieCanvas-content-value"
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
                  class="pieCanvas-content-name"
                >
                  {{ slotProps.data.name }}
                </div>
              </div>
            </template>
          </Pie>
        </div>

        <div
          class="pie-legend"
        >
          <div
            v-for="(item, index) in state.pieData"
            :key="index"
            class="pie-legend-item"
          >
            <div
              class="icon"
              :style="{ borderColor: state.pieDataColor[index] }"
            />

            <div
              class="name"
            >
              {{ item.name }}
            </div>

            <div
              class="value"
            >
              {{ item.value }}<span
                class="unit"
              >亿</span>
            </div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<style lang="scss">
.pie-chat-wrap {
  width: 100%;
  height: 100%;
  display: flex;
}
// 饼图
.pie-chat {
  pointer-events: all;
  position: relative;
  width: 236px;
  height: 100%;

  .pieCanvas {
    width: 100%;
    height: 100%;
    pointer-events: all;
  }
  .pieCanvas-content {
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 12px;
    &-value {
      font-size: 15px;
      font-weight: bold;
      text-shadow: 0 0 10px rgb(0 0 0);
    }
    &-name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
      font-size: 12px;
      text-align: center;
    }
  }
}
// 饼图3d legend
.pie-legend {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0;
  &-item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    box-sizing: border-box;

    .icon {
      width: 10px;
      height: 10px;
      border-radius: 10px;
      border: 2px solid #17e6c3;
      box-sizing: border-box;
      margin-right: 10px;
    }
    .name {
      font-weight: 500;
      font-size: 12px;
      color: #ffffff;
    }
    .value {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-end;
      justify-content: flex-end;
      width: 80px;
      text-align: right;

      font-weight: bold;
      color: #ffffff;
      font-family: D-DIN;
      font-weight: bold;
      font-size: 16px;
      .unit {
        font-family: D-DIN;
        font-weight: 400;
        font-size: 10px;
        color: #ffffff;
        opacity: 0.5;
        padding-left: 10px;
      }
    }
  }
}
</style>
