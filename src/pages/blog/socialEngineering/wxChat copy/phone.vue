<!------------------------------------  手机展示  ------------------------------------------------->
<script lang="ts" setup>
import type { SettingType } from './index.vue'

import type { DialogType } from './type'

import { computed } from 'vue'

import weChatNavBack from './images//wechat-nav-back.png'

import iosBatteryChargeDark from './images/bar/ios-battery-charge-dark.png'

import iosBatteryDark from './images/bar/ios-battery-dark.png'

import weChatNavRight from './images/wechat-nav-right.png'

import weChatTransEarPhone from './images/wechat-trans-earphone.png'

const props = defineProps<{

  /**
   *  设置
   */
  setting: SettingType
}>()

const signalImageUrl = computed(() => {
  return new URL(
    `./images/bar/ios-single-${props.setting.appearance.phoneSignal}-dark.png`,
    import.meta.url,
  ).href
})

const wifiImageUrl = computed(() => {
  return new URL(
    `./images/bar/ios-wifi-${props.setting.appearance.wifiSignal}-dark.png`,
    import.meta.url,
  ).href
})

const dialogList = ref<DialogType[]>([
  {
    id: 'dialog-1',
    type: 'text',
    content: 'hello，world',
    is_me: false,
    user_id: 'user-2',
  },
  {
    id: 'dialog-2',
    type: 'text',
    content: 'hello，world!!!',
    is_me: true,
    user_id: 'user-1',
  },
  {
    id: 'dialog-3',
    type: 'notice',
    content: '2022年5月20日 下午5:20',
  },
  {
    id: 'dialog-4',
    type: 'transfer',
    money: '1.00',
    is_me: true,
    user_id: 'user-1',
    is_get: false,
    remark: '转账给马先生',
  },
  {
    id: 'dialog-5',
    type: 'transfer',
    money: '1.00',
    user_id: 'user-2',
    is_get: true,
    remark: '已领取',
  },
  {
    id: 'dialog-6',
    type: 'redpacket',
    money: '1.00',
    is_me: true,
    user_id: 'user-1',
    is_get: false,
    remark: '恭喜发财，大吉大利',
  },
  {
    id: 'dialog-7',
    type: 'redpacket',
    money: '1.00',
    user_id: 'user-2',
    is_get: true,
    remark: '恭喜发财，大吉大利',
  },
  {
    id: 'dialog-8',
    type: 'voice',
    time: 2,
    is_me: false,
    user_id: 'user-2',
  },
  {
    id: 'dialog-9',
    type: 'voice',
    time: 10,
    is_me: false,
    user_id: 'user-2',
  },
  {
    id: 'dialog-10',
    type: 'voice',
    time: 60,
    is_me: true,
    user_id: 'user-1',
  },
])
</script>

<template>
  <div
    class="phone-wrap h-[812px] w-[375px] font-['SF_Pro','PingFang_SC']"
  >
    <div
      class="phone-content origin-[0_0] scale-33.333 border border-[#f1f1f1] border-solid"
    >
      <div
        id="phone"
        class="phone relative z-998 h-[2436px] w-[1125px] bg-[#ededed] text-[36px]"
      >
        <!-- 顶部 -->
        <div
          class="phone-top relative z-99999 bg-[#ededed]"
        >
          <div
            class="phone-bar h-[132px] flex items-center p-l-[43px] p-r-[95px]"
          >
            <!-- 手机时间 -->
            <div
              class="phone-time flex-1 text-[45px] font-semibold"
            >
              {{ setting.appearance.phoneTime }}
            </div>

            <!-- 手机信号 -->
            <div
              class="mr-[6px] h-[36px] w-[54px] bg-no-repeat indent--9999px"
              :style="{
                backgroundImage: `url(${signalImageUrl})`,
              }"
            >
              <!-- 手机信号 -->
            </div>

            <!-- wifi信号 -->
            <div
              class="phone-wifi mr-[6px] h-[45px] w-[63px] bg-no-repeat indent--9999px"
              :style="{
                backgroundImage: `url(${wifiImageUrl})`,
              }"
            >
              <!-- wifi信号 -->
            </div>

            <!-- 电量 -->
            <div
              class="relative h-[36px] w-[75px] pl-[7px] pr-[16px]"
            >
              <!-- 电池背景（固定样式） -->
              <div
                class="absolute inset-0 bg-no-repeat"
                :style="{ backgroundImage: `url(${iosBatteryDark})` }"
              />

              <!-- 电量条 -->
              <span
                class="absolute inset-y-0 left-[7px] right-[16px] flex items-center"
              >
                <span
                  class="block h-[22px] rounded-[4px]"
                  :style="{
                    width: `${setting.appearance.phoneBattery}%`,
                    backgroundColor: setting.appearance.isCharging ? '#65c466' : '#000',
                  }"
                />
              </span>

              <!-- 充电图标（仅充电时显示） -->
              <div
                v-if="setting.appearance.isCharging"
                class="absolute left-1/2 top-1/2 h-[32px] w-[30px] bg-no-repeat -translate-x-1/2 -translate-y-1/2"
                :style="{
                  backgroundImage: `url(${iosBatteryChargeDark})`,
                  backgroundSize: 'contain',
                }"
              />
            </div>
          </div>

          <!-- 返回 和 更多 按钮 -->
          <div
            class="relative h-[132px] flex items-center px-[50px]"
          >
            <div
              class="relative w-[150px]"
            >
              <div
                class="h-[52px] w-[27px] bg-no-repeat indent--9999px"
                :style="{
                  backgroundImage: `url(${weChatNavBack})`,
                }"
              >
                返回
              </div>

              <span
                v-if="setting.appearance.messageCount > 0"
                class="absolute left-[45px] top-1/2 h-[72px] min-w-[72px] rounded-[36px] bg-[#d5d5d5] px-[24px] text-center text-[36px] leading-[72px] font-[600] -mt-[36px]"
              >
                {{ setting.appearance.messageCount }}
              </span>
            </div>

            <div
              class="flex flex-1 justify-center"
            >
              <span
                class="flex items-center text-[51px] font-[500]"
              >
                <font>测试</font>

                <i
                  v-if="setting.appearance.isEarpieceMode"
                  class="ml-[15px] h-[42px] w-[31px] bg-no-repeat"
                  :style="{
                    backgroundImage: `url(${weChatTransEarPhone})`,
                  }"
                />
              </span>
            </div>

            <div
              class="w-[150px] flex justify-end"
            >
              <div
                class="h-[12px] w-[70px] bg-no-repeat indent-[-9999px]"
                :style="{
                  backgroundImage: `url(${weChatNavRight})`,
                }"
              >
                更多
              </div>
            </div>
          </div>

        </div>

        <!-- 背景图片 -->
        <div
          class="absolute top-0 h-full w-full flex items-center justify-center overflow-hidden"
        >
          <img
            :src="setting.appearance.chatBackgroundImage"
            class="h-full flex-none"
          >
        </div>

        <!-- 主体 -->
        <div
          class="phone-body"
        >
          <div
            class="wechat-content"
          >
            <template
              v-for="(dialog, index) in dialogList"
              :key="dialog.id"
            >
              <div
                class="wechat-dialog"
                :class="[{ 'wechat-dialog-right': dialog.is_me }]"
              >
                <div
                  v-if="dialog.type !== 'notice'"
                  class="wechat-dialog-face"
                >
                  <img
                    :src="getUserById(dialog.user_id).image"
                  >
                </div>

                <template
                  v-if="dialog.type === 'text'"
                >
                  <div
                    class="wechat-dialog-text"
                  >
                    {{ dialog.content }}
                  </div>
                </template>

                <template
                  v-if="dialog.type === 'image'"
                >
                  <div
                    class="wechat-dialog-text wechat-dialog-image"
                    :class="[{ 'wechat-dialog-image-noborder': setting.background !== '' }]"
                  >
                    <img
                      :src="dialog.image"
                    >
                  </div>
                </template>

                <template
                  v-if="dialog.type === 'voice'"
                >
                  <div
                    class="wechat-dialog-text wechat-dialog-voice"
                  >
                    <div
                      v-if="dialog.is_me"
                      :style="{ width: `${getVoiceLength(dialog.time)}px` }"
                    />

                    <span
                      v-if="dialog.is_me"
                    >{{ dialog.time }}"</span>

                    <i />

                    <span
                      v-if="!dialog.is_me"
                    >{{ dialog.time }}"</span>

                    <div
                      v-if="!dialog.is_me"
                      :style="{ width: `${getVoiceLength(dialog.time)}px` }"
                    />

                    <em
                      v-if="!dialog.is_me && dialog.isread === '0'"
                    />
                  </div>
                </template>

                <template
                  v-if="dialog.type === 'notice'"
                >
                  <div
                    class="wechat-dialog-notice"
                  >
                    <span
                      :class="[{ 'wechat-dialog-notice-has-bg': setting.background !== '' }, { 'wechat-dialog-notice-system': dialog.is_system }]"
                      v-html="dialog.content"
                    />
                  </div>
                </template>

                <template
                  v-if="dialog.type === 'transfer' || dialog.type === 'redpacket'"
                >
                  <div
                    class="wechat-dialog-text wechat-dialog-trans"
                    :class="[{ 'wechat-dialog-trans-get': dialog.is_get }]"
                  >
                    <div
                      class="wechat-dialog-trans-content"
                      :class="[{ 'wechat-dialog-redp-content': dialog.type === 'redpacket' }]"
                    >
                      <i />

                      <div>
                        <span
                          v-if="dialog.type === 'transfer'"
                        >¥{{ moneyFormat(dialog.money, 2, '', false) }}</span>

                        <font
                          v-if="dialog.type === 'transfer'"
                        >
                          {{ dialog.remark }}
                        </font>

                        <span
                          v-if="dialog.type === 'redpacket'"
                        >{{ dialog.remark }}</span>

                        <font
                          v-if="dialog.type === 'redpacket' && dialog.is_get"
                        >
                          已领取
                        </font>
                      </div>
                    </div>

                    <div
                      class="wechat-dialog-trans-bottom"
                    >
                      <span
                        v-if="dialog.type === 'transfer'"
                      >微信转账</span>

                      <span
                        v-if="dialog.type === 'redpacket'"
                      >微信红包</span>
                    </div>
                  </div>
                </template>

                <a
                  class="a-wechat-dialog-del"
                  href="javascript:;"
                  title="删除对话"
                  @click="deleteDialog(index)"
                >X</a>

                <div
                  v-if="!dialog.is_get && dialog.type === 'redpacket'"
                  class="a-wechat-dialog-menu"
                >
                  <a
                    @click="redpacketGet(index)"
                  >领取</a>
                </div>

                <div
                  v-if="!dialog.is_get && dialog.type === 'transfer'"
                  class="a-wechat-dialog-menu"
                >
                  <a
                    @click="transferGet(index)"
                  >领取</a>
                </div>
              </div>
            </template>

            <div
              class="wechat-dialog el-remove"
            >
              <div
                class="wechat-dialog-notice"
              >
                <span
                  class="wechat-dialog-notice-has-bg"
                >2019年5月20日 下午4:20</span>
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>

            <div
              class="wechat-dialog wechat-dialog-right el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text wechat-dialog-voice"
              >
                <span>1"</span>

                <i />
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>

            <div
              class="wechat-dialog el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text wechat-dialog-voice"
              >
                <i />

                <span>1"</span>

                <em />
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>

            <div
              class="wechat-dialog wechat-dialog-right el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text wechat-dialog-image"
              >
                <img
                  src="static/app/images/dialog-demo1.jpeg"
                >
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>

            <div
              class="wechat-dialog wechat-dialog-right el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text"
              >
                hellohelhellohellohellohellohellohellolohello
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>

            <div
              class="wechat-dialog el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text wechat-dialog-trans"
              >
                <div
                  class="wechat-dialog-trans-content"
                >
                  <i />

                  <div>
                    <span>¥1.00</span>

                    <font>
                      转账给微截图
                    </font>
                  </div>
                </div>

                <div
                  class="wechat-dialog-trans-bottom"
                >
                  <span>微信转账</span>
                </div>
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>

              <div
                class="a-wechat-dialog-menu"
              >
                <a>领取</a>
              </div>
            </div>

            <div
              class="wechat-dialog el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text wechat-dialog-trans wechat-dialog-trans-get"
              >
                <div
                  class="wechat-dialog-trans-content"
                >
                  <i />

                  <div>
                    <span>¥1.00</span>

                    <font>
                      转账给微截图
                    </font>
                  </div>
                </div>

                <div
                  class="wechat-dialog-trans-bottom"
                >
                  <span>微信转账</span>
                </div>
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>

            <div
              class="wechat-dialog wechat-dialog-right el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text wechat-dialog-trans"
              >
                <div
                  class="wechat-dialog-trans-content"
                >
                  <i />

                  <div>
                    <span>¥1.00</span>

                    <font>
                      转账给微截图
                    </font>
                  </div>
                </div>

                <div
                  class="wechat-dialog-trans-bottom"
                >
                  <span>微信转账</span>
                </div>
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>

            <div
              class="wechat-dialog wechat-dialog-right el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text wechat-dialog-trans wechat-dialog-trans-get"
              >
                <div
                  class="wechat-dialog-trans-content"
                >
                  <i />

                  <div>
                    <span>¥1.00</span>

                    <font>
                      转账给微截图
                    </font>
                  </div>
                </div>

                <div
                  class="wechat-dialog-trans-bottom"
                >
                  <span>微信转账</span>
                </div>
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>

            <div
              class="wechat-dialog el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text wechat-dialog-trans"
              >
                <div
                  class="wechat-dialog-trans-content wechat-dialog-redp-content"
                >
                  <i />

                  <div>
                    <span>恭喜发财，大吉大利</span>
                  </div>
                </div>

                <div
                  class="wechat-dialog-trans-bottom"
                >
                  <span>微信红包</span>
                </div>
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>

            <div
              class="wechat-dialog wechat-dialog-right el-remove"
            >
              <div
                class="wechat-dialog-face"
              >
                <img
                  src="static/app/images/user-face.png"
                >
              </div>

              <div
                class="wechat-dialog-text wechat-dialog-trans wechat-dialog-trans-get"
              >
                <div
                  class="wechat-dialog-trans-content wechat-dialog-redp-content"
                >
                  <i />

                  <div>
                    <span>恭喜发财，大吉大利</span>
                  </div>
                </div>

                <div
                  class="wechat-dialog-trans-bottom"
                >
                  <span>微信红包</span>
                </div>
              </div>

              <a
                class="a-wechat-dialog-del"
                href="javascript:;"
                title="删除对话"
              >X</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
