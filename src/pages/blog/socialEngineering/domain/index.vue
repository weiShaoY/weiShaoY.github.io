<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

import dayjs from 'dayjs'

import { ref } from 'vue'

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

    // console.log('%c Line:225 🍎 response', 'color:#42b983', response)

    domainData.value = response
  }
  catch (error: any) {
    Notification.error(error.message || '获取数据失败，请稍后重试')

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
      <a-input-search
        v-model="domain"
        class="w-[60%]"
        allow-clear
        search-button
        placeholder="请输入域名"
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
        :column="{ xs: 1, md: 1, lg: 3 }"
        bordered
      >
        <a-descriptions-item
          :span="2"
          label="单位名称"
        >
          {{ domainData.icp.subject.name }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="单位性质"
        >
          {{ domainData.icp.subject.nature }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="备案许可证编号"
        >
          {{ domainData.icp.subject.license }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="信息更新时间"
        >
          {{ domainData.icp.subject.updateTime }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="备案网站域名"
        >
          {{ domainData.icp.website.domain }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="备案许可证编号"
        >
          {{ domainData.icp.website.license }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="域名状态"
        >
          <div
            class="flex flex-col items-start gap-2"
          >
            <a-link
              v-for="item in domainData.whois['Domain Status']"
              :key="item"
              :href="handleStatus(item).url"
              target="_blank"
            >
              {{ handleStatus(item).text }}
            </a-link>
          </div>
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="域名 DNS 服务器列表"
        >
          <div
            class="flex flex-col items-start gap-2"
          >
            <a-link
              v-for="item in domainData.whois['Name Server']"
              :key="item"
              :href="handleStatus(item).url"
              target="_blank"
            >
              {{ handleStatus(item).text }}
            </a-link>
          </div>
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="域名创建时间"
        >
          {{ handleDate(domainData.whois["Created Date"]) }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="域名更新时间"
        >
          {{ handleDate(domainData.whois["Updated Date"]) }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="域名到期时间"
        >
          {{ handleDate(domainData.whois["Expiry Date"]) }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="注册商名称"
        >
          {{ domainData.whois.Registrar }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="DNS A 记录"
        >
          <span
            v-for="item in domainData.dns.A"
            :key="item"
          >
            {{ item }}<br>
          </span>
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="DNS AAAA 记录"
        >
          {{ domainData.dns.AAAA?.join(", ") }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="DNS CNAME 记录"
        >
          {{ domainData.dns.CNAME?.join(", ") }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="DNS NS 记录"
        >
          <span
            v-for="item in domainData.dns.NS"
            :key="item"
          >
            {{ item }}<br>
          </span>
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="ISP和区域"
        >
          {{
            domainData.dns.GEO.isp && domainData.dns.GEO.area
              ? `${domainData.dns.GEO.isp} - ${domainData.dns.GEO.area}`
              : ""
          }}
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </div>
</template>
