<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

import { ref } from 'vue'

const isLoading = ref(false)

const type = ref('qq')

const searchValue = ref('5201314')

type DataType = {
  qq?: {

    /**
     * 查询手机号
     */
    phone: {

      /**
       * QQ号
       */
      qq: string

      /**
       * 手机号
       */
      phone: string

      /**
       * 手机号地区
       */
      phonediqu: string
    }

    /**
     * 查询LOL
     */
    lol: {

      /**
       * LOL名称
       */
      name: string

      /**
       * LOL所在大区
       */
      daqu: string
    }

    /**
     * 查询QQ老密码
     */
    oldPassword: {

      /**
       * QQ老密码
       */
      qqlm: string
    }
  }

  phone?: {
    qq: {

      /**
       * QQ号
       */
      qq: string

      /**
       * 手机号
       */
      phone: string

      /**
       * 手机号地区
       */
      phonediqu: string
    }

    weiBo: {

      /**
       * 微博ID
       */
      id: string
    }
  }

  lol?: {
    qq: {

      /**
       * QQ号
       */
      qq: string

      /**
       * LOL名称
       */
      name: string

      /**
       * LOL所在大区
       */
      daqu: string
    }
  }

  weiBo?: {
    phone: {

      /**
       * 手机号
       */
      phone: string

      /**
       * 手机号地区
       */
      phonediqu: string
    }
  }
}

const data = ref<DataType>({
  qq: {
    phone: {
      qq: '',
      phone: '',
      phonediqu: '',
    },
    lol: {
      name: '',
      daqu: '',
    },
    oldPassword: {
      qqlm: '',
    },
  },
  phone: {
    qq: {
      qq: '',
      phone: '',
      phonediqu: '',
    },
    weiBo: {
      id: '',
    },
  },
  lol: {
    qq: {
      qq: '',
      name: '',
      daqu: '',
    },
  },
  weiBo: {
    phone: {
      phone: '',
      phonediqu: '',
    },
  },
})

/**
 *  清空数据
 */
function clearData() {
  data.value = {
    qq: {
      phone: {
        qq: '',
        phone: '',
        phonediqu: '',
      },
      lol: {
        name: '',
        daqu: '',
      },
      oldPassword: {
        qqlm: '',
      },
    },
    phone: {
      qq: {
        qq: '',
        phone: '',
        phonediqu: '',
      },
      weiBo: {
        id: '',
      },
    },
    lol: {
      qq: {
        qq: '',
        name: '',
        daqu: '',
      },
    },
    weiBo: {
      phone: {
        phone: '',
        phonediqu: '',
      },
    },
  }
}

async function getData() {
  try {
    if (!type.value || !searchValue.value) {
      // throw new Error('请输入香烟名称')
      return
    }

    clearData()

    isLoading.value = true

    if (type.value === 'qq') {
      const [res_phone, res_lol, res_oldPassword] = await Promise.all([
        BlogApi.getQqQueryPhone(searchValue.value),

        BlogApi.getQqQueryLol(searchValue.value),

        BlogApi.getQqQueryOldPassword(searchValue.value),
      ])

      data.value = {
        qq: {
          phone: res_phone,
          lol: res_lol,
          oldPassword: res_oldPassword,
        },
      }
    }
    else if (type.value === 'phone') {
      const [res_qq, res_weiBo] = await Promise.all([
        BlogApi.getPhoneQueryQq(searchValue.value),

        BlogApi.getPhoneQueryWeiBo(searchValue.value),
      ])

      data.value = {
        phone: {
          qq: res_qq,
          weiBo: res_weiBo,
        },
      }
    }
    else if (type.value === 'lol') {
      const res_qq = await BlogApi.getLolQueryQq(searchValue.value)

      data.value = {
        lol: {
          qq: res_qq,
        },
      }
    }
    else if (type.value === 'weiBo') {
      const res_phone = await BlogApi.getWeiBoIdQueryPhone(searchValue.value)

      data.value = {
        weiBo: {
          phone: res_phone,
        },
      }
    }
  }
  catch (error: any) {
    Notification.error(error.message || '获取数据失败，请稍后重试')

    clearData()
  }
  finally {
    isLoading.value = false
  }
}

function handleSelectChange() {
  searchValue.value = ''
  clearData()
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-5"
    >
      <a-select
        v-model="type"
        class="w-40"
        placeholder="请选择查询类型"
        @change="handleSelectChange"
      >
        <a-option
          value="qq"
        >
          QQ号查询
        </a-option>

        <a-option
          value="phone"
        >
          手机号查询
        </a-option>

        <a-option
          value="lol"
        >
          LOL查询
        </a-option>

        <a-option
          value="weiBo"
        >
          微博ID查询
        </a-option>
      </a-select>

      <a-input-search
        v-model="searchValue"
        class="w-[60%]"
        allow-clear
        search-button
        :placeholder="
          type === 'qq'
            ? '请输入QQ号'
            : type === 'phone'
              ? '请输入手机号'
              : type === 'lol'
                ? '请输入LOL名称'
                : type === 'weiBo'
                  ? '请输入微博ID'
                  : ''
        "
        :loading="isLoading"
        @search="getData"
        @press-enter="getData"
        @clear="clearData"
      >
        <template
          #button-icon
        >
          <SvgIcon
            icon="blog-search"
          />
        </template>

        <template
          #button-default
        >
          搜索
        </template>
      </a-input-search>
    </div>

    <a-spin
      :loading="isLoading"
    >
      <a-descriptions
        :column="{ xs: 1, md: 1, lg: 1 }"
        bordered
      >
        <template
          v-if="type === 'qq'"
        >
          <a-descriptions-item
            :span="1"
            label="手机号"
          >
            {{ data?.qq?.phone.phone }}
          </a-descriptions-item>

          <a-descriptions-item
            :span="1"
            label="手机号归属地"
          >
            {{ data?.qq?.phone.phonediqu }}
          </a-descriptions-item>

          <a-descriptions-item
            :span="1"
            label="LOL名称"
          >
            {{ data?.qq?.lol.name }}
          </a-descriptions-item>

          <a-descriptions-item
            :span="1"
            label="LOL所在大区"
          >
            {{ data?.qq?.lol.daqu }}
          </a-descriptions-item>

          <a-descriptions-item
            :span="1"
            label="QQ老密码"
          >
            {{ data?.qq?.oldPassword.qqlm }}
          </a-descriptions-item>
        </template>

        <template
          v-if="type === 'phone'"
        >
          <a-descriptions-item
            :span="1"
            label="QQ号"
          >
            {{ data?.phone?.qq.qq }}
          </a-descriptions-item>

          <a-descriptions-item
            :span="1"
            label="手机号地区"
          >
            {{ data?.phone?.qq.phonediqu }}
          </a-descriptions-item>

          <a-descriptions-item
            :span="1"
            label="微博ID"
          >
            {{ data?.phone?.weiBo.id }}
          </a-descriptions-item>
        </template>

        <template
          v-if="type === 'lol'"
        >
          <a-descriptions-item
            :span="1"
            label="QQ号"
          >
            {{ data?.lol?.qq.qq }}
          </a-descriptions-item>

          <a-descriptions-item
            :span="1"
            label="手机号地区"
          >
            {{ data?.lol?.qq.name }}
          </a-descriptions-item>

          <a-descriptions-item
            :span="1"
            label="微博ID"
          >
            {{ data?.lol?.qq.daqu }}
          </a-descriptions-item>
        </template>

        <template
          v-if="type === 'weiBo'"
        >
          <a-descriptions-item
            :span="1"
            label="手机号"
          >
            {{ data?.weiBo?.phone.phone }}
          </a-descriptions-item>

          <a-descriptions-item
            :span="1"
            label="手机号地区"
          >
            {{ data?.weiBo?.phone.phonediqu }}
          </a-descriptions-item>
        </template>
      </a-descriptions>
    </a-spin>
  </div>
</template>
