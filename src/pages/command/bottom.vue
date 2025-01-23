<script setup lang="ts">
import BasicBox from './components/basic-box.vue'

import {
  getModuleName,
  getName,
  getValue,
} from './utils'

const parentData = inject('data')

const { showMore } = parentData

console.log('%c Line:14 🍿 getModuleName(\'fireDrillAndTraining\')', 'color:#4fff4B', getModuleName('fireDrillAndTraining'))
</script>

<template>
  <div
    class="container-bottom position-bottom-0 z-999 flex"
  >
    <div
      class="mr-[10px] w-[50%] bg-[#112034]"
    >
      <BasicBox
        :title="getModuleName('clockIn')"
        size="large"
        height="200px"
      >
        <div
          class="left-container flex"
        >
          <div
            class="main-container w-[52%] flex"
          >
            <img
              src="../images/business/zbdk1.png"
              alt=""
            >

            <div>
              <span
                class="number"
              >{{ getValue('clockIn', 0) }}</span>

              <span
                class="dw"
              >
                班次
              </span>

              <div
                class="title"
              >
                <div
                  class="text-gradient"
                >
                  {{ getName('clockIn', 0) }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="main-container w-[48%] flex"
          >
            <img
              src="../images/business/zbdk1.png"
              alt=""
            >

            <div>
              <span
                class="number"
              >{{ getValue('clockIn', 1) }}</span>

              <span
                class="dw"
              >
                班次
              </span>

              <div
                class="title"
              >
                <div
                  class="text-gradient"
                >
                  {{ getName('clockIn', 1) }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="main-container bottom-container w-[52%] flex"
          >
            <img
              src="../images/business/zbdk2.png"
              alt=""
            >

            <div>
              <span
                class="number cursor-pointer font1"
                @click="showMore(5)"
              >{{
                getValue('clockIn', 2)
              }}</span>

              <span
                class="dw"
              >
                家
              </span>

              <div
                class="title"
              >
                <div
                  class="text-gradient"
                >
                  {{ getName('clockIn', 2) }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="main-container bottom-container w-[48%] flex"
          >
            <img
              src="../images/business/zbdk2.png"
              alt=""
            >

            <div>
              <span
                class="number cursor-pointer font1"
                @click="showMore(6)"
              >{{
                getValue('clockIn', 3)
              }}</span>

              <span
                class="dw"
              >
                人次
              </span>

              <div
                class="title"
              >
                <div
                  class="text-gradient"
                >
                  {{ getName('clockIn', 3) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasicBox>
    </div>

    <div
      class="w-[50%] bg-[#112034]"
    >
      <BasicBox
        :title="getModuleName('fireDrillAndTraining')"
        width="50%"
        height="200px"
      >
        <div
          class="right-container"
        >
          <div>
            <div
              class="bg-container"
            >
              <span
                class="number"
              >{{ getValue('fireDrillAndTraining', 0) }}</span>

              <span
                class="dw"
              >
                次
              </span>
            </div>

            <div
              class="title-container"
            >
              <div
                class="text-gradient"
              >
                {{ getName('fireDrillAndTraining', 0) }}
              </div>
            </div>
          </div>

          <div>
            <div
              class="bg-container"
            >
              <span
                class="number"
              >{{ getValue('fireDrillAndTraining', 1) }}</span>

              <span
                class="dw"
              >
                次
              </span>
            </div>

            <div
              class="title-container"
            >
              <div
                class="text-gradient"
              >
                {{ getName('fireDrillAndTraining', 1) }}
              </div>
            </div>
          </div>

          <div>
            <div
              class="bg-container"
            >
              <span
                class="number"
              >{{ getValue('fireDrillAndTraining', 2) }}</span>

              <span
                class="dw"
              >
                人次
              </span>
            </div>

            <div
              class="title-container"
            >
              <div
                class="text-gradient"
              >
                {{ getName('fireDrillAndTraining', 2) }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="footer-container flex"
        >
          <img
            src="../images/business/pxjgs.png"
            alt=""
            class="img"
          >

          <div
            class="flex"
          >
            <span
              class="title"
            >{{ getName('fireDrillAndTraining', 3) }}</span>

            <span
              class="number cursor-pointer"
              @click="showMore(9)"
            >
              {{ getValue('fireDrillAndTraining', 3) }}
            </span>

            <span
              class="dw"
            >
              家
            </span>
          </div>
        </div>
      </BasicBox>
    </div>
  </div>
</template>

<style scoped lang="less">

@import './common.less';

.container-bottom {
  position: absolute;
  bottom: 34px;
  left: 22.5%;
  width: 55%;
  height: 266px;

  .left-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 17px;

    .main-container {
      width: 50%;

      .number {
        width: 62px;
        height: 37px;
        margin-left: 12px;
        margin-top: 9px;
        // font-family: DINAlternate, DINAlternate;
        font-weight: bold;
        font-size: 32px;
        color: #00e3f8;
        line-height: 37px;
        text-align: left;
        font-style: normal;
      }

      .dw {
        width: 28px;
        height: 20px;
        margin-left: 4px;
        // font-family:
        //   PingFangSC,
        //   PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 20px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .title {
        // width: 100px;
        height: 20px;
        margin-left: 12px;
        margin-top: 4px;
        // font-family: PangMenZhengDao;
        font-size: 16px;
        color: #ffffff;
        line-height: 21px;
        text-align: left;
        font-style: normal;
      }

      .font1 {
        color: #ffba00;
      }
    }

    .bottom-container {
      margin-top: 5px;
    }
  }

  .right-container {
    display: flex;
    justify-content: space-around;

    .bg-container {
      // margin-left: 39px;
      // margin-top: 10px;
      // width: 89px;
      height: 77px;
      text-align: center;
      background: url('../images/business/xfyl.png') top center no-repeat;

      .number {
        // margin-left: 20px;
        width: 31px;
        height: 37px;
        // font-family: DINAlternate, DINAlternate;
        font-weight: bold;
        font-size: 32px;
        color: #00e3f8;
        line-height: 37px;
        text-align: left;
        font-style: normal;
      }

      .last-number {
        margin-left: 5px;
      }

      .dw {
        margin-left: 4px;
        width: 14px;
        height: 20px;
        // font-family:
        //   PingFangSC,
        //   PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 20px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }

    .last-container {
      margin-left: 0;
    }

    .title-container {
      // margin-left: 25px;
      margin-top: 8px;
      width: 130px;
      height: 20px;
      font-size: 18px;
      color: #ffffff;
      line-height: 21px;
      text-align: center;
      font-style: normal;
    }
  }

  .footer-container {
    margin-left: 49px;
    margin-top: 9px;

    .img {
      width: 60px;
      height: 77px;
    }

    .title {
      margin-left: 28px;
      width: 246px;
      height: 77px;
      // font-family: PangMenZhengDao, PangMenZhengDao;
      font-weight: normal;
      font-size: 18px;
      color: #ffffff;
      line-height: 77px;
      text-align: left;
      font-style: normal;
    }

    .number {
      margin-left: 35px;
      width: 27px;
      height: 77px;
      // font-family: DINAlternate, DINAlternate;
      font-weight: bold;
      font-size: 28px;
      color: #ffc934;
      line-height: 70px;
      text-align: left;
      font-style: normal;
    }

    .dw {
      margin-left: 8px;
      width: 13px;
      height: 77px;
      // font-family:
      //   PingFangSC,
      //   PingFang SC;
      font-weight: 400;
      font-size: 13px;
      color: #ffffff;
      line-height: 77px;
      text-align: right;
      font-style: normal;
    }
  }
}
</style>
