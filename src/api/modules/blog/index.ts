import { fetchHttp } from '../../http'

/**
 *  ThingProxy  (最快)
 *  @description  ThingProxy 是一个免费的跨域代理服务，它可以让你在浏览器中访问其他网站的资源，而无需设置 CORS 头。
 */
const proxyUrl = import.meta.env.VITE_API_PROXY_URL

class BlogApi {
  /**
   *  测试接口
   */
  apiTest(url: string = 'https://v2.api-m.com/api/weather?city=枣庄滕州', isProxy: boolean = false) {
    return fetchHttp(isProxy ? proxyUrl + url : url)
  }

  /**
   *  获取 大盘黄金价格
   *  @see https://api.aa1.cn/doc/pear_goldPrice.html
   */
  getMarketGoldPrice() {
    //  *  @see https://api.pearktrue.cn/info?id=348
    //  return fetchHttp('https://api.pearktrue.cn/api/goldprice/')
    return fetchHttp('https://tools.mgtv100.com/external/v1/pear/goldPrice')
  }

  /**
   *  获取 黄金价格实时查询
   */
  getRealTimeGoldPrice() {
    return fetchHttp(`${proxyUrl}https://api.lolimi.cn/API/huangj/api.php`)
  }

  /**
   *  获取 问候语
   */
  getGreeting() {
    return fetchHttp('https://api.kuleu.com/api/getGreetingMessage?type=json')
  }

  /**
   *  获取 励志语句
   */
  getMotivationalQuotes() {
    return fetchHttp('https://zj.v.api.aa1.cn/api/wenan-zl/?type=json')
  }

  /**
   *  获取 即将上映电影
   */
  getComingSoonMovie() {
    return fetchHttp('https://free.xwteam.cn/api/cinema/coming')
  }

  /**
   *  获取 院线热播电影
   */
  getHotTheaterMovie() {
    return fetchHttp('https://free.xwteam.cn/api/cinema/hot')
  }

  /**
   *  获取 王者荣耀战力
   *  @param {string} type - 战力类型
   *  @param {string} hero - 英雄名称
   */
  getHok(type: string, hero: string) {
    return fetchHttp(
      `https://free.xwteam.cn/api/game/hok?type=${type}&hero=${hero}`,
    )
  }

  /**
   *  获取 壁纸
   *  @param {string} category - 壁纸分类
   */
  getWallpaper(category: string) {
    return fetchHttp(`https://free.xwteam.cn/api/img/pic?category=${category}`)
  }

  /**
   *  获取 妹子(腿子)
   *  @see https://api.lolimi.cn/doc-api_mxyf.html
   *  @url https://api.lolimi.cn/API/meizi/api.php
   */
  getTuiImage() {
    return fetchHttp('https://api.lolimi.cn/API/meizi/api.php')
  }

  /**
   *  获取 随机男高美图
   *  @see https://api.aa1.cn/doc/sjngmt.html
   *  @url https://api.jkyai.top/API/sjngmt.php
   */
  getRandomManImage() {
    return fetchHttp('https://api.jkyai.top/API/sjngmt.php')
  }

  /**
   *  获取 随机美少女视频
   */
  getRandomGirlVideo() {
    return fetchHttp('http://www.wudada.online/Api/ScSp')
  }

  /**
   *  获取  随机返回一条小姐姐视频
   */
  getRandomReturnOneGirlVideo() {
    return fetchHttp('https://tools.mgtv100.com/external/v1/pear/xjj')
  }

  /**
   *  获取 测试视频
   */
  getTestVideo() {
    return fetchHttp('https://tucdn.wpon.cn/api-girl/index.php?wpon=json')
  }

  /**
   *  获取车牌信息
   *  @param {string} licensePlateNumber - 车牌号
   */
  getLicensePlateNumberInfo(licensePlateNumber: string) {
    return fetchHttp(
      `https://v.api.aa1.cn/api/car-number-fl/index.php?num=${licensePlateNumber}`,
    )
  }

  /**
   *  获取 域名的 whois 信息
   *  @param {string} domain - 域名
   */
  getDomainWhoisInfo(domain: string) {
    return fetchHttp(`https://v2.api-m.com/api/whois?domain=${domain}`)
  }

  /**
   *  获取 网址综合查询
   *  @param {string} domain - 域名
   *  @see https://api.pearktrue.cn/info?id=199
   */
  async getWebsiteDetails(domain: string) {
    const data = await fetchHttp(
      `https://api.pearktrue.cn/api/website/synthesis.php?url=${domain}`,
    )

    //  data.whois.domainStatusList = data.whois["Domain Status"]

    return data
  }

  /**
   *  获取 随机绿茶语音
   *  @see https://api.pearktrue.cn/info?id=143
   */
  async getRandomGreenTeaVoice() {
    const data = await fetchHttp(
      'https://api.pearktrue.cn/api/greentea/?type=mp3',
    )

    return data.audiopath
  }

  /**
   *  获取 随机怼人语音
   *  @see https://api.pearktrue.cn/info?id=146
   */
  async getRandomDuiRenVoice() {
    const data = await fetchHttp(
      'https://api.pearktrue.cn/api/duiren/?type=mp3',
    )

    return data.audiopath
  }

  /**
   *  获取 随机御姐撒娇语音
   *  @see https://api.pearktrue.cn/info?id=145
   */
  async getRandomYujieVoice() {
    const data = await fetchHttp(
      'https://api.pearktrue.cn/api/yujie/?type=mp3',
    )

    return data.audiopath
  }

  /**
   *  全国油价查询
   *  @see https://api.pearktrue.cn/info?id=282
   */
  async getOilPrices() {
    return fetchHttp(`https://api.pearktrue.cn/api/oil/`)
  }

  /**
   *  IP同站查询
   *  @see https://api.pearktrue.cn/info?id=265
   */
  getIpHistoricalSites(ip: string) {
    return fetchHttp(`https://api.pearktrue.cn/api/website/sameip/?ip=${ip}`)
  }

  /**
   *  IP端口查询
   *  @param {string} ip - IP
   *  @see https://api.pearktrue.cn/info?id=244
   */
  getIpPortFromCensys(ip: string) {
    return fetchHttp(`https://api.pearktrue.cn/api/ipport/?ip=${ip}`)
  }

  /**
   * 获取 域名比价查询
   *  @param {string} domainExtension - 域名后缀
   *  @param {string} [type] - 查询模式，默认为注册 (`new`)，可选：`new`（注册）、`renew`（续费）、`transfer`（转入）。
   *  @see https://api.pearktrue.cn/info?id=236
   */
  getDomainExtensionPriceRanking(
    domainExtension: string,
    type: 'new' | 'renew' | 'transfer' = 'new',
  ) {
    return fetchHttp(
      `https://api.pearktrue.cn/api/website/domain/?domain=${domainExtension}&type=${type}`,
    )
  }

  /**
   *  获取 恋爱话术
   *  @param {string} question - 问题
   *  @param {number} page - 页码
   *  @see https://api.pearktrue.cn/info?id=75
   */
  getLoveSpeech(question: string, page: number) {
    return fetchHttp(
      `https://api.pearktrue.cn/api/love/?question=${question}&page=${page}`,
    )
  }

  /**
   *  获取 商品历史价格查询
   *  @see https://api.pearktrue.cn/info?id=66
   */
  getPriceHistory(url: string) {
    return fetchHttp(
      `https://api.pearktrue.cn/api/shop/history.php?url=${url}`,
    )
  }

  /**
   *  获取 快递物流查询
   *  @param {string} order - 快递单号
   *  @see https://api.pearktrue.cn/info?id=61
   */
  getLogistic(order: string) {
    return fetchHttp(`https://api.pearktrue.cn/api/kuaidi/?order=${order}`)
  }

  /**
   *  香烟价格查询
   *  @param {string} cigarette - 香烟名称
   *  @see https://api.lolimi.cn/doc-api_shnb.html
   *  @url https://api.lolimi.cn/API/xyan/api.php?msg=白沙
   */
  getCigarettePrice(cigarette: string) {
    // return fetchHttp("https://api.lolimi.cn/API/xyan/api.php?msg=白沙");

    type CigaretteType = {

      /**
       *  香烟名称
       */
      name: string

      /**
       *  其他属性，键是字符串，值是字符串或未定义
       */
      [key: string]: string | undefined | number

      /**
       *  新增 id 字段，表示香烟的唯一标识
       */
      id: number
    }

    function convertPrice(price: string): number {
      // 使用正则表达式提取数字部分
      const match = price.match(/(\d+(\.\d+)?)/)

      // 如果匹配到数字，则返回数字，否则返回 null
      if (match) {
        return Number.parseFloat(match[0])
      }

      return 0
    }

    /**
     * 格式化香烟信息数据为数组
     * @param {string} data - 包含香烟信息的原始数据字符串
     * @returns {Array} 格式化后的香烟信息数组
     */
    function formatCigaretteData(data: string): Array<CigaretteType> {
      const formattedData: Array<CigaretteType> = []

      // 按照 "====================" 分割各条香烟信息
      const cigarettes = data.split('====================')

      cigarettes.forEach((item, index) => {
        // 过滤掉空字符串
        if (item.trim()) {
          // 按行分割每个香烟的属性
          const lines = item
            .split('\n')
            .map(line => line.trim())
            .filter(line => line !== '')

          // 提取香烟名称
          const name = lines[0].replace('香烟: ', '').trim()

          // 创建一个对象存储香烟信息
          const cigaretteInfo: CigaretteType = {
            name,
            id: index + 1,
          }

          // 提取其他属性
          lines.slice(1).forEach((line) => {
            const [key, value] = line.split('：')

            if (key && value) {
              cigaretteInfo[key.trim()] = value.trim()
            }

            if (key === '单盒参考价' || key === '条盒参考价') {
              cigaretteInfo[key.trim()] = convertPrice(value)
            }
          })

          // 将格式化后的香烟对象添加到数组中
          formattedData.push(cigaretteInfo)
        }
      })
      return formattedData
    }

    async function getData() {
      const response = await fetch(
        `${proxyUrl}https://api.lolimi.cn/API/xyan/api.php?msg=${cigarette}`,
      )

      if (!response.ok) {
        throw new Error('网络请求失败')
      }

      const data = await response.text()

      return formatCigaretteData(data)
    }

    return getData()
  }

  /**
   *  QQ号查询绑定手机
   *  @see https://zy.xywlapi.cc/
   */
  getQqQueryPhone(qq: string) {
    return fetchHttp(`https://api.xywlapi.cc/qqapi?qq=${qq}`)
  }

  /**
   *  QQ号查询LOL信息
   *  @see https://zy.xywlapi.cc/
   */
  getQqQueryLol(qq: string) {
    return fetchHttp(`https://api.xywlapi.cc/qqlol?qq=${qq}`)
  }

  /**
   *  QQ号查询老密
   *  @see https://zy.xywlapi.cc/
   */
  getQqQueryOldPassword(qq: string) {
    return fetchHttp(`https://api.xywlapi.cc/qqlm?qq=${qq}`)
  }

  /**
   *  手机号查询绑定QQ
   *  @see https://zy.xywlapi.cc/
   */
  getPhoneQueryQq(phone: string) {
    return fetchHttp(`https://api.xywlapi.cc/qqphone?phone=${phone}`)
  }

  /**
   *  通过手机号查微博ID
   *  @see https://zy.xywlapi.cc/
   */
  getPhoneQueryWeiBo(phone: string) {
    return fetchHttp(`https://api.xywlapi.cc/wbphone?phone=${phone}`)
  }

  /**
   *  LOL查询QQ信息
   *  @see https://zy.xywlapi.cc/
   */
  getLolQueryQq(lolName: string) {
    return fetchHttp(`https://api.xywlapi.cc/lolname?name=${lolName}`)
  }

  /**
   *  微博通过ID查手机号
   *  @see https://zy.xywlapi.cc/
   */
  getWeiBoIdQueryPhone(weiBoId: string) {
    return fetchHttp(`https://api.xywlapi.cc/wbapi?id=${weiBoId}`)
  }

  /**
   *  获取 中央气象台天气预报
   *  @see https://linux.do/t/topic/170114
   *  @url http://www.nmc.cn/rest/weather?stationid={stationid}
   *  @param {string} city - 城市ID
   */
  getWeather(city: string) {
    // return fetchHttp(`http://www.nmc.cn/rest/real/${city}`);
    return fetchHttp(`http://www.nmc.cn/rest/weather?stationid=${city}`)
  }

  /**
   *  爱情文案
   *  @see https://api.aa1.cn/doc/api-wenan-aiqing.html
   */
  getLoveText() {
    return fetchHttp(
      'https://v.api.aa1.cn/api/api-wenan-aiqing/index.php?type=json',
    )
  }

  /**
   *  可用快递查询
   *  @see https://api.aa1.cn/doc/szx-express-tracking.html
   */
  getExpressTracking(tracking: string) {
    return fetchHttp(
      `https://api.songzixian.com/api/express/tracking?dataSource=nationwide_express&trackingNumber=${tracking}`,
    )
  }
}

export default new BlogApi()
