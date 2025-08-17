<script lang="ts" setup>
import dayjs from 'dayjs'

import { ref } from 'vue'

import { BlogApi } from '@/apis'

/**
 * 表示完整的域名信息结构
 */
type DomainInfoType = {

  /**
   * ICP 备案信息
   */
  icp: {

    /**
     * 备案主体信息
     */
    subject: {

      /**
       * 单位名称
       */
      name: string

      /**
       * 单位性质，例如“企业”或“个人”
       */
      nature: string

      /**
       * 备案许可证编号
       */
      license: string

      /**
       * 信息更新时间，格式为 YYYY-MM-DD HH:mm:ss
       */
      updateTime: string
    }

    /**
     * 备案网站信息
     */
    website: {

      /**
       * 网站域名
       */
      domain: string

      /**
       * 网站备案许可证编号
       */
      license: string
    }
  }

  /**
   * Whois 信息
   */
  whois: {

    /**
     * 域名状态列表
     */
    'Domain Status': string[]

    /**
     * 域名的 DNS 服务器列表
     */
    'Name Server': string[]

    /**
     * 域名创建时间
     */
    'Created Date': string

    /**
     * 域名更新时间
     */
    'Updated Date': string

    /**
     * 域名到期时间
     */
    'Expiry Date': string

    /**
     * 注册商名称
     */
    'Registrar': string
  }

  /**
   * DNS 信息
   */
  dns: {

    /**
     * A 记录列表
     */
    A: string[]

    /**
     * AAAA 记录列表
     */
    AAAA: string[]

    /**
     * CNAME 记录列表
     */
    CNAME: string[]

    /**
     * NS 记录列表
     */
    NS: string[]

    /**
     * 地理位置信息
     */
    GEO: {

      /**
       * 互联网服务提供商
       */
      isp: string

      /**
       * 所在区域
       */
      area: string
    }
  }
}
const isLoading = ref(false)

const domain = ref('baidu.com')

const domainData = ref<DomainInfoType>({
  icp: {
    subject: {
      name: '',
      nature: '',
      license: '',
      updateTime: '',
    },
    website: {
      domain: '',
      license: '',
    },
  },
  whois: {
    'Domain Status': [],
    'Name Server': [],
    'Created Date': '',
    'Updated Date': '',
    'Expiry Date': '',
    'Registrar': '',
  },
  dns: {
    A: [],
    AAAA: [],
    CNAME: [],
    NS: [],
    GEO: {
      isp: '',
      area: '',
    },
  },
})

/**
 *  清空数据
 */
function clearData() {
  domainData.value = {
    icp: {
      subject: {
        name: '',
        nature: '',
        license: '',
        updateTime: '',
      },
      website: {
        domain: '',
        license: '',
      },
    },
    whois: {
      'Domain Status': [],
      'Name Server': [],
      'Created Date': '',
      'Updated Date': '',
      'Expiry Date': '',
      'Registrar': '',
    },
    dns: {
      A: [],
      AAAA: [],
      CNAME: [],
      NS: [],
      GEO: {
        isp: '',
        area: '',
      },
    },
  }
}

async function getData() {
  try {
    if (!domain.value) {
      throw new Error('请输入域名')
    }

    clearData()

    isLoading.value = true

    const response = await BlogApi.getWebsiteDetails(domain.value)

    if (response.icp) {
      domainData.value = response
    }
    else {
      isLoading.value = false
      window.$notification?.error({
        title: '获取数据失败，请稍后重试',
      })

      clearData()
    }
  }
  catch (error: any) {
    window.$notification?.error({
      title: '获取数据失败，请稍后重试',
      message: error.message,
    })

    clearData()
  }
  finally {
    isLoading.value = false
  }
}

function handleStatus(status: string) {
  const [text, url] = status.split(' ')

  return {
    text,
    url,
  }
}

function handleDate(date: string) {
  if (date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
  }

  return ''
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
      <el-input
        v-model.trim="domain"
        clearable
        size="large"
        placeholder="请输入域名"
        class="!max-w-[30%] !overflow-hidden"
        @keydown.enter.prevent="getData"
        @clear="clearData"
      >
        <template
          #append
        >
          <BaseButton
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
      <el-descriptions-item
        :span="2"
        label="单位名称"
      >
        {{ domainData.icp.subject.name }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="单位性质"
      >
        {{ domainData.icp.subject.nature }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="备案许可证编号"
      >
        {{ domainData.icp.subject.license }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="信息更新时间"
      >
        {{ domainData.icp.subject.updateTime }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="备案网站域名"
      >
        {{ domainData.icp.website.domain }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="备案许可证编号"
      >
        {{ domainData.icp.website.license }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="域名状态"
      >
        <div
          class="flex flex-col items-start gap-2"
        >
          <el-link
            v-for="item in domainData.whois['Domain Status']"
            :key="item"
            :href="handleStatus(item).url"
            target="_blank"
            type="primary"
          >
            {{ handleStatus(item).text }}
          </el-link>
        </div>
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="域名 DNS 服务器列表"
      >
        <div
          class="flex flex-col items-start gap-2"
        >
          <el-link
            v-for="item in domainData.whois['Name Server']"
            :key="item"
            :href="handleStatus(item).url"
            target="_blank"
            type="primary"
          >
            {{ handleStatus(item).text }}
          </el-link>
        </div>
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="域名创建时间"
      >
        {{ handleDate(domainData.whois["Created Date"]) }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="域名更新时间"
      >
        {{ handleDate(domainData.whois["Updated Date"]) }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="域名到期时间"
      >
        {{ handleDate(domainData.whois["Expiry Date"]) }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="注册商名称"
      >
        {{ domainData.whois.Registrar }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="DNS A 记录"
      >
        <span
          v-for="item in domainData.dns.A"
          :key="item"
        >
          {{ item }}<br>
        </span>
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="DNS AAAA 记录"
      >
        {{ domainData.dns.AAAA?.join(", ") }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="DNS CNAME 记录"
      >
        {{ domainData.dns.CNAME?.join(", ") }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="DNS NS 记录"
      >
        <span
          v-for="item in domainData.dns.NS"
          :key="item"
        >
          {{ item }}<br>
        </span>
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="ISP和区域"
      >
        {{
          domainData.dns.GEO.isp && domainData.dns.GEO.area
            ? `${domainData.dns.GEO.isp} - ${domainData.dns.GEO.area}`
            : ""
        }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
