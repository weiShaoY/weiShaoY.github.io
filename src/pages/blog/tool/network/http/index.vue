<script lang="ts" setup>
const data = [
  {
    key: 1,
    title: '表示接收的请求正在处理',
    list: [
      {
        code: 100,
        name: 'Continue',
        description: '继续。客户端应继续其请求',
      },
      {
        code: 101,
        name: 'Switching Protocols',
        description: '切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议,例如,切换到HTTP的新版本协议',
      },
    ],
  },
  {
    key: 2,
    title: '表示请求正常处理完毕',
    list: [
      {
        code: 200,
        name: 'OK',
        description: '请求成功。一般用于GET与POST请求',
      },
      {
        code: 201,
        name: 'Created',
        description: '已创建。成功请求并创建了新的资源',
      },
      {
        code: 202,
        name: 'Accepted',
        description: '已接受。已经接受请求,但未处理完成',
      },
      {
        code: 203,
        name: 'Non-Authoritative Information',
        description: '非授权信息。请求成功。但返回的meta信息不在原始的服务器,而是一个副本',
      },
      {
        code: 204,
        name: 'No Content',
        description: '无内容。服务器成功处理,但未返回内容。在未更新网页的情况下,可确保浏览器继续显示当前文档',
      },
      {
        code: 205,
        name: 'Reset Content',
        description: '重置内容。服务器处理成功,用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域',
      },
      {
        code: 206,
        name: 'Partial Content',
        description: '部分内容。服务器成功处理了部分GET请求',
      },
    ],
  },
  {
    key: 3,
    title: '需要后续操作才能完成这一请求',
    list: [
      {
        code: 300,
        name: 'Multiple Choices',
        description: '多种选择。请求的资源可包括多个位置,相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择',
      },
      {
        code: 301,
        name: 'Moved Permanently',
        description: '永久移动。请求的资源已被永久的移动到新URI,返回信息会包括新的URI,浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替',
      },
      {
        code: 302,
        name: 'Found',
        description: '临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI',
      },
      {
        code: 303,
        name: 'See Other',
        description: '查看其它地址。与301类似。使用GET和POST请求查看',
      },
      {
        code: 304,
        name: 'Not Modified',
        description: '未修改。所请求的资源未修改,服务器返回此状态码时,不会返回任何资源。客户端通常会缓存访问过的资源,通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源',
      },
      {
        code: 305,
        name: 'Use Proxy',
        description: '使用代理。所请求的资源必须通过代理访问',
      },
      {
        code: 306,
        name: 'Unused',
        description: '已经被废弃的HTTP状态码',
      },
      {
        code: 307,
        name: 'Temporary Redirect',
        description: '临时重定向。与302类似。使用GET请求重定向',
      },
    ],
  },
  {
    key: 4,
    title: '表示请求包含语法错误或无法完成',
    list: [
      {
        code: 400,
        name: 'Bad Request',
        description: '客户端请求的语法错误,服务器无法理解',
      },
      {
        code: 401,
        name: 'Unauthorized',
        description: '请求要求用户的身份认证',
      },
      {
        code: 402,
        name: 'Payment Required',
        description: '保留,将来使用',
      },
      {
        code: 403,
        name: 'Forbidden',
        description: '服务器理解请求客户端的请求,但是拒绝执行此请求',
      },
      {
        code: 404,
        name: 'Not Found',
        description: '服务器无法根据客户端的请求找到资源（网页）。通过此代码,网站设计人员可设置\'您所请求的资源无法找到\'的个性页面',
      },
      {
        code: 405,
        name: 'Method Not Allowed',
        description: '客户端请求中的方法被禁止',
      },
      {
        code: 406,
        name: 'Not Acceptable',
        description: '服务器无法根据客户端请求的内容特性完成请求',
      },
      {
        code: 407,
        name: 'Proxy Authentication Required',
        description: '请求要求代理的身份认证,与401类似,但请求者应当使用代理进行授权',
      },
      {
        code: 408,
        name: 'Request Time-out',
        description: '服务器等待客户端发送的请求时间过长,超时',
      },
      {
        code: 409,
        name: 'Conflict',
        description: '服务器完成客户端的PUT请求是可能返回此代码,服务器处理请求时发生了冲突',
      },
      {
        code: 410,
        name: 'Gone',
        description: '客户端请求的资源已经不存在。410不同于404,如果资源以前有现在被永久删除了可使用410代码,网站设计人员可通过301代码指定资源的新位置',
      },
      {
        code: 411,
        name: 'Length Required',
        description: '服务器无法处理客户端发送的不带Content-Length的请求信息',
      },
      {
        code: 412,
        name: 'Precondition Failed',
        description: '客户端请求信息的先决条件错误',
      },
      {
        code: 413,
        name: 'Request Entity Too Large',
        description: '由于请求的实体过大,服务器无法处理,因此拒绝请求。为防止客户端的连续请求,服务器可能会关闭连接。如果只是服务器暂时无法处理,则会包含一个Retry-After的响应信息',
      },
      {
        code: 414,
        name: 'Request-URI Too Large',
        description: '请求的URI过长(URI通常为网址),服务器无法处理',
      },
      {
        code: 415,
        name: 'Unsupported Media Type',
        description: '服务器无法处理请求附带的媒体格式',
      },
      {
        code: 416,
        name: 'Requested range not satisfiable',
        description: '客户端请求的范围无效',
      },
      {
        code: 417,
        name: 'Expectation Failed',
        description: '服务器无法满足Expect的请求头信息',
      },
    ],
  },
  {
    key: 5,
    title: '服务器在处理请求的过程中发生了错误',
    list: [
      {
        code: 500,
        name: 'Internal Server Error',
        description: '服务器内部错误,无法完成请求',
      },
      {
        code: 501,
        name: 'Not Implemented',
        description: '服务器不支持请求的功能,无法完成请求',
      },
      {
        code: 502,
        name: 'Bad Gateway',
        description: '充当网关或代理的服务器,从远端服务器接收到了一个无效的请求',
      },
      {
        code: 503,
        name: 'Service Unavailable',
        description: '由于超载或系统维护,服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中',
      },
      {
        code: 504,
        name: 'Gateway Time-out',
        description: '充当网关或代理的服务器,未及时从远端服务器获取请求',
      },
      {
        code: 505,
        name: 'HTTP Version not supported',
        description: '服务器不支持请求的HTTP协议的版本,无法完成处理',
      },
    ],
  },
]

</script>

<template>
  <el-table
    :data="data"
    class="h-full w-full"
    default-expand-all
  >
    <el-table-column
      type="expand"
    >
      <template
        #default="props"
      >

        <el-table
          :data="props.row.list"
        >
          <el-table-column
            prop="code"
            label="响应状态码"
            sortable
          />

          <el-table-column
            prop="name"
            label="响应状态码英文名称"
            align="left"
          />

          <el-table-column
            label="响应状态码中文描述"
            prop="description"
            align="left"
          />
        </el-table>
      </template>
    </el-table-column>

    <el-table-column
      prop="key"
      label=""
      align="left"
    >
      <template
        #default="{ row }"
      >
        <div
          class="flex items-center gap-2 font-bold"
        >
          <span
            class="text-5"
            :class="
              {
                'text-[#D9D9D9]': row.key === 1,
                'text-[#84F867]': row.key === 2,
                'text-[#548EDF]': row.key === 3,
                'text-[#F0BE67]': row.key === 4,
                'text-[#C53127]': row.key === 5,
              }
            "
          >
            <span>
              {{ row.key }}
            </span>

            <span>xx</span>
          </span>

          <span>
            {{ row.title }}
          </span>
        </div>
      </template>

    </el-table-column>
  </el-table>
</template>
