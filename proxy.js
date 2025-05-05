/**
 *  接口地址
 */
const url = 'https://target-api.com/data'

/**
 *  CORS-Anywhere
 *  (先访问其主页并点击授权按钮，才能临时启用代理功能) (https://cors-anywhere.herokuapp.com/)
 */
const proxyUrl1 = `https://cors-anywhere.herokuapp.com/${url}`

/**
 *  AllOrigins
 */
const proxyUrl2 = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`

/**
 *  ThingProxy  (最快)
 */
const proxyUrl3 = `https://thingproxy.freeboard.io/fetch/${url}`
