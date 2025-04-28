<script lang="ts" setup>
import { BlogApi } from '@/api'

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
      window.$notification?.error('请输入!')
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
    window.$notification?.error(error.message || '获取数据失败，请稍后重试')

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

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-5"
    >

      <el-select
        v-model="type"
        placeholder="请选择"
        size="large"
        class="!w-60"
        @change="handleSelectChange"
      >
        <el-option
          value="qq"
          label="QQ号查询"
        />

        <el-option
          value="phone"
          label="手机号查询"
        />

        <el-option
          value="lol"
          label="LOL查询"
        />

        <el-option
          value="weiBo"
          label="微博ID查询"
        />

      </el-select>

      <el-input
        v-model.trim="searchValue"
        clearable
        size="large"
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
        class="!max-w-[30%] !overflow-hidden"
        @keydown.enter.prevent="getData"
        @clear="clearData"
      >
        <template
          #append
        >
          <ButtonIcon
            icon="search"
            :loading="isLoading"
            @click="getData"
          />
        </template>
      </el-input>
    </div>

    <el-descriptions
      v-loading="isLoading"
      :column="1"
      border
    >
      <template
        v-if="type === 'qq'"
      >
        <el-descriptions-item
          :span="1"
          label="手机号"
        >
          {{ data?.qq?.phone.phone }}
        </el-descriptions-item>

        <el-descriptions-item
          :span="1"
          label="手机号归属地"
        >
          {{ data?.qq?.phone.phonediqu }}
        </el-descriptions-item>

        <el-descriptions-item
          :span="1"
          label="LOL名称"
        >
          {{ data?.qq?.lol.name }}
        </el-descriptions-item>

        <el-descriptions-item
          :span="1"
          label="LOL所在大区"
        >
          {{ data?.qq?.lol.daqu }}
        </el-descriptions-item>

        <el-descriptions-item
          :span="1"
          label="QQ老密码"
        >
          {{ data?.qq?.oldPassword.qqlm }}
        </el-descriptions-item>
      </template>

      <template
        v-if="type === 'phone'"
      >
        <el-descriptions-item
          :span="1"
          label="QQ号"
        >
          {{ data?.phone?.qq.qq }}
        </el-descriptions-item>

        <el-descriptions-item
          :span="1"
          label="手机号地区"
        >
          {{ data?.phone?.qq.phonediqu }}
        </el-descriptions-item>

        <el-descriptions-item
          :span="1"
          label="微博ID"
        >
          {{ data?.phone?.weiBo.id }}
        </el-descriptions-item>
      </template>

      <template
        v-if="type === 'lol'"
      >
        <el-descriptions-item
          :span="1"
          label="QQ号"
        >
          {{ data?.lol?.qq.qq }}
        </el-descriptions-item>

        <el-descriptions-item
          :span="1"
          label="手机号地区"
        >
          {{ data?.lol?.qq.name }}
        </el-descriptions-item>

        <el-descriptions-item
          :span="1"
          label="微博ID"
        >
          {{ data?.lol?.qq.daqu }}
        </el-descriptions-item>
      </template>

      <template
        v-if="type === 'weiBo'"
      >
        <el-descriptions-item
          :span="1"
          label="手机号"
        >
          {{ data?.weiBo?.phone.phone }}
        </el-descriptions-item>

        <el-descriptions-item
          :span="1"
          label="手机号地区"
        >
          {{ data?.weiBo?.phone.phonediqu }}
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>
