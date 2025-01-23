<script setup lang="ts">
import dayjs from 'dayjs'

import AutoScrollTable from './components/auto-scroll-table.vue'

import CountUp from './components/count-up.vue'

import DeviceBox from './components/device-box.vue'

import {
  getModuleName,
  getName,
  getValue,
} from './utils'

type AlarmListType = {
  content: number | string
  status: number
  date: number | string
  statusText: number | string
  subscribe: number | string
}
const parentData = inject('data')

const { showMore } = parentData as any

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const alarmList = ref<AlarmListType[]>([])

function generateList() {
  const statusTextMap: { [key in number]: string } = {
    1: '普通告警',
    2: '重要告警',
    3: '紧急告警',
  }

  for (let i = 0; i < 11; i++) {
    const status = getRandomInt(1, 3)

    alarmList.value.push({
      content: '设备：13号智能烟感设备',
      subscribe: '厨房餐厅',
      status,
      statusText: statusTextMap[status],
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })
  }
}

generateList()

</script>

<template>
  <div
    class="container-left ml-[16px] mt-[22px]"
  >
    <BasicBox
      :title="getModuleName('safetySystem')"
      height="235px"
    >
      <div
        class="h-full w-full"
      >
        <div
          class="w-full flex items-center justify-center"
        >
          <div
            class="flex-1"
          >
            <img
              src="./images/business/institution.png"
              alt=""
              class="mx-auto mb-[10px] h-[90px] w-[90px]"
            >

            <div
              class="text"
            >
              <div>
                {{ getName('safetySystem', 0) }}
              </div>
            </div>
          </div>

          <div
            class="flex-1"
          >
            <img
              src="./images/business/duty.png"
              alt=""
              class="mx-auto mb-[10px] h-[90px] w-[90px]"
            >

            <div
              class="text"
            >
              <div>
                {{ getName('safetySystem', 1) }}
              </div>
            </div>
          </div>

          <div
            class="flex-1"
          >
            <img
              src="./images/business/pre-plan.png"
              alt=""
              class="mx-auto mb-[10px] h-[90px] w-[90px]"
            >

            <div
              class="text"
            >
              <div>
                {{ getName('safetySystem', 2) }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="space-between w-full flex items-center"
        >
          <div
            class="file-info flex-1"
          >
            <div
              class="left-text"
            >
              <div
                class="info-value cursor-pointer !text-[#00E3F8]"
                @click="showMore(0)"
              >
                <CountUp
                  :start-val="0"
                  :end-val="getValue('safetySystem', 0)"
                />
              </div>

              <div
                class="info-unit"
              >
                家
              </div>
            </div>
          </div>

          <div
            class="file-info mx-[10px] flex-1"
          >
            <div
              class="left-text flex-1"
            >
              <div
                class="info-value cursor-pointer !text-[#FF5151]"
                @click="showMore(1)"
              >
                <CountUp
                  :start-val="0"
                  :end-val="getValue('safetySystem', 1)"
                />
              </div>

              <div
                class="info-unit"
              >
                家
              </div>
            </div>
          </div>

          <div
            class="file-info flex-1"
          >
            <div
              class="left-text"
            >
              <div
                class="info-value cursor-pointer !text-[#FFBA00]"
                @click="showMore(2)"
              >
                <CountUp
                  :start-val="0"
                  :end-val="getValue('safetySystem', 2)"
                />
              </div>

              <div
                class="info-unit"
              >
                家
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicBox>

    <DeviceBox
      :module-keys="['fireAwarenessEquipmentType', 'fireFightingEquipmentType']"
    />

    <BasicBox
      title="实时动态"
      height="235px"
    >
      <AutoScrollTable
        :headers="[
          {
            key: 'content',
            title: '内容',
            style: {},
          },
          {
            key: 'date',
            title: '时间',
            style: {},
          },
        ]"
        :rows="alarmList"
        :class-options="{
          step: 0.5,
        }"
      />
    </BasicBox>
  </div>
</template>

<style scoped lang="less">
.container-left {
  height: 89.4%;
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 9999;
  width: 400px;
  background: linear-gradient(180deg, rgba(0, 0, 1, 0.5) 0%, #091829 100%);
  backdrop-filter: blur(4px);
  .text {
    font-family: PangMenZhengDao;
    font-size: 18px;
    color: #ffffff;
    line-height: 21px;
    text-align: center;
    font-style: normal;
    div {
      background: linear-gradient(to top, #ffffff, #caf9ff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .file-info {
    position: relative;
    margin-top: 10px;
    height: 114px;
    background: linear-gradient(180deg, #0f3c67 0%, rgba(22, 67, 110, 0.29) 53%, rgba(29, 74, 116, 0) 100%);
    border-radius: 8px 8px 0px 0px;
    border: 2px solid;
    border-image: linear-gradient(to bottom, rgba(97, 204, 255, 1), rgba(29, 70, 89, 0.93), rgba(8, 40, 58, 0));
    border-image-slice: 1;
    border-bottom: 0;
    text-align: center;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;

    &::after {
      content: '';
      position: absolute;
      top: -2px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 52px;
      height: 3px;
      background: #4fd3fe;
    }
    .left-text {
      // width: calc((100% - 11px) / 2);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding: 10px;
      .info-title {
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 20px;
        font-style: normal;
        text-transform: none;
      }
      .info-value {
        width: 100%;
        font-family: DINAlternate, DINAlternate;
        font-weight: bold;
        font-size: 42px;
        line-height: 37px;
        font-style: normal;
        margin: 10px 0;
      }
      .info-unit {
        margin-top: 5px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 400;
        font-size: 21px;
        color: rgba(255, 255, 255, 0.49);
        line-height: 18px;
        font-style: normal;
      }
    }
    .placeholder {
      width: 1px;
      height: 90px;
      background: linear-gradient(180deg, rgba(79, 211, 254, 0) 0%, #4fd3fe 52%, rgba(216, 216, 216, 0) 100%);
      opacity: 0.53;
      margin: 0 5px;
    }
  }
  // 底部
  .scroll {
    overflow: hidden;
    height: 95%;
    .item {
      padding: 8px 12px;
      width: 100%;
      height: 120px;
      background: linear-gradient(180deg, #182f4a 0%, #112034 100%);
      margin-bottom: 5px;
      .item-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left-title {
          display: flex;
          align-items: center;
        }
        img {
          width: 39px;
          height: 39px;
          margin-right: 10px;
        }
        .normal {
          font-family: PangMenZhengDao, PangMenZhengDao;
          font-weight: normal;
          font-size: 24px;
          color: #69ddff;
          line-height: 27px;
          letter-spacing: 2px;
          text-align: left;
          font-style: normal;
        }
        .middle {
          font-family: PangMenZhengDao, PangMenZhengDao;
          font-weight: normal;
          font-size: 24px;
          color: #f3b158;
          line-height: 27px;
          letter-spacing: 2px;
          text-align: left;
          font-style: normal;
        }
        .height {
          font-family: PangMenZhengDao, PangMenZhengDao;
          font-weight: normal;
          font-size: 24px;
          color: #dd5858;
          line-height: 27px;
          letter-spacing: 2px;
          text-align: left;
          font-style: normal;
        }
        .time {
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          line-height: 22px;
          text-align: right;
          font-style: normal;
        }
      }
      .item-content {
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 600;
        font-size: 20px;
        color: #ffffff;
        line-height: 28px;
        text-align: left;
        font-style: normal;
        margin-top: 4px;
      }
      .item-subscribe {
        margin-top: 8px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.41);
        line-height: 22px;
        text-align: left;
        font-style: normal;
      }
    }
  }
}
</style>
