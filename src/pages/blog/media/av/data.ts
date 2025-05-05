import _18avSvg from './svg/site/18av.svg'

import av01Svg from './svg/site/av01.svg'

import avjoySvg from './svg/site/avjoy.svg'

import bestjavpornSvg from './svg/site/bestjavporn.svg'

import evojavSvg from './svg/site/evojav.svg'

import ggjavSvg from './svg/site/ggjav.svg'

import hayavSvg from './svg/site/hayav.svg'

import highpornSvg from './svg/site/highporn.svg'

import jableSvg from './svg/site/jable.svg'

import javbusSvg from './svg/site/javbus.svg'

import javdbSvg from './svg/site/javdb.svg'

import javfc2Svg from './svg/site/javfc2.svg'

import javGuruSvg from './svg/site/javGuru.svg'

// import javlibSvg from './svg/site/javlib.svg'

import javmenuSvg from './svg/site/javmenu.svg'

import javmostSvg from './svg/site/javmost.svg'

import missAvSvg from './svg/site/missAv.svg'

import netflavSvg from './svg/site/netflav.svg'

// import njavSvg from './svg/site/njav.svg'

import paipanconSvg from './svg/site/paipancon.svg'

import supjavSvg from './svg/site/supjav.svg'

export const SP_PREFIX = '300' as const

export const siteList: OnlinePlayType.SiteItem[] = [
  {
    name: '123av',
    icon: jableSvg,
    hostname: '123av.com',
    url: 'https://123av.com/zh/search?keyword={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: `.detail>a[href*='v/']`,
      titleQuery: `.detail>a[href*='v/']`,
    },
  },
  {
    name: '18av',
    icon: _18avSvg,
    hostname: '18av.mm-cg.com',
    url: 'https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.posts h3>a[href]',
      titleQuery: '.posts h3>a[href]',
    },
  },

  {
    name: 'AV01',
    icon: av01Svg,
    hostname: 'www.av01.tv',
    url: 'https://www.av01.tv/search/videos?search_query={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'div.well>a[href^=\'/video/\']',
      titleQuery: 'div.well>a[href^=\'/video/\']',
    },
  },
  {
    name: 'AvJoy',
    icon: avjoySvg,
    hostname: 'avjoy.me',
    url: 'https://avjoy.me/search/videos/{{code}}',
    fetchType: 'parser',
    domQuery: {
      titleQuery: `#wrapper .row .content-info span.content-title`,
      linkQuery: `#wrapper .row a[href^="/video/"]`,
    },
  },
  {
    name: 'BestJP',
    icon: bestjavpornSvg,
    hostname: 'bestjavporn.com',
    url: 'https://www3.bestjavporn.com/search/{{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'article.thumb-block>a',
      titleQuery: 'article.thumb-block>a',
    },
  },
  {
    name: 'evojav',
    icon: evojavSvg,
    hostname: 'evojav.pro',
    url: 'https://evojav.pro/video/{{code}}/',
    fetchType: 'get',
    domQuery: {
    },
  },
  {
    name: 'GGJAV',
    icon: ggjavSvg,
    hostname: 'ggjav.com',
    url: 'https://ggjav.com/main/search?string={{code}}',
    fetchType: 'parser',
    domQuery: {
      listIndex: 1,
      titleQuery: 'div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a',
      linkQuery: 'div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a',
    },
  },
  {
    name: 'HAYAV',
    icon: hayavSvg,
    hostname: 'hayav.com',
    url: 'https://hayav.com/video/{{code}}/',
    fetchType: 'get',
    domQuery: {
    },
  },
  {
    name: 'highporn',
    icon: highpornSvg,
    hostname: 'highporn.net',
    url: 'https://highporn.net/search/videos?search_query={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.well>a[href]',
      titleQuery: '.well>a[href]>span.video-title',
    },
  },
  {
    name: 'Jable',
    icon: jableSvg,
    hostname: 'jable.tv',
    url: 'https://jable.tv/videos/{{code}}/',
    fetchType: 'get',
    domQuery: {
      subQuery: '.info-header',
      leakQuery: '.info-header',
    },
  },
  {
    name: 'JAVFC2',
    icon: javfc2Svg,
    hostname: 'javfc2.net',
    url: 'https://javfc2.net/?s={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'article.loop-video>a[href]',
      titleQuery: 'article.loop-video .entry-header',
    },
  },
  {
    name: 'Jav.Guru',
    icon: javGuruSvg,
    hostname: 'jav.guru',
    url: 'https://jav.guru/?s={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.imgg>a[href]',
      titleQuery: '.inside-article>.grid1 a[title]',
    },
  },

  // {
  //   name: 'JAVLib',
  //   icon: javlibSvg,
  //   disableLibItemName: 'javlib',
  //   hostname: 'javlibrary.com',
  //   url: 'https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}',
  //   fetchType: 'false',

  // },
  {
    name: 'JAVMENU',
    icon: javmenuSvg,
    hostname: 'javmenu.com',
    url: 'https://javmenu.com/{{code}}',
    fetchType: 'get',
    domQuery: {
      videoQuery: 'a.nav-link[aria-controls=\'pills-0\']',
    },
  },
  {
    name: 'JAVMOST',
    icon: javmostSvg,
    hostname: 'javmost.cx',
    url: 'https://javmost.cx/search/{{code}}/',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.card #myButton',
      titleQuery: '.card-block h4.card-title',
    },
  },
  {
    name: 'JavBus',
    icon: javbusSvg,
    hostname: 'javbus.com',
    url: 'https://javbus.com/{{code}}',
    fetchType: 'get',
    domQuery: {
    },
    codeFormater: preCode => (preCode.startsWith('MIUM') ? `${SP_PREFIX}${preCode}` : preCode),
  },
  {
    name: 'JavDB',
    icon: javdbSvg,
    hostname: 'javdb.com',
    url: 'https://javdb.com/search?q={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.movie-list>.item:first-child>a',
      titleQuery: '.video-title',
    },
  },
  {
    name: 'MISSAV',
    icon: missAvSvg,
    hostname: 'missav.ws',
    url: 'https://missav.ws/{{code}}/',
    fetchType: 'get',
    domQuery: {
      subQuery: '.space-y-2 a.text-nord13[href="https://missav.ws/chinese-subtitle"]',
      leakQuery: '.order-first div.rounded-md a[href]:last-child',
    },
  },
  {
    name: 'NETFLAV',
    icon: netflavSvg,
    hostname: 'netflav5.com',
    url: 'https://netflav5.com/search?type=title&keyword={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: '.grid_0_cell>a[href^=\'/video?\']',
      titleQuery: '.grid_0_cell>a[href^=\'/video?\'] .grid_0_title',
    },
  },

  {
    name: 'paipancon',
    icon: paipanconSvg,
    hostname: 'paipancon.com',
    url: 'https://paipancon.com/search/{{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: 'div.col>div.card>a[href]',
      titleQuery: 'div.card img.card-img-top',
    },
  },
  {
    name: 'Supjav',
    icon: supjavSvg,
    hostname: 'supjav.com',
    url: 'https://supjav.com/zh/?s={{code}}',
    fetchType: 'parser',
    domQuery: {
      linkQuery: `.posts.clearfix>.post>a.img[title]`,
      titleQuery: `h3>a[rel="bookmark"][itemprop="url"]`,
    },
  },
]
