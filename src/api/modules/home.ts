import { fetchHttp } from '@/api'

class HomeApi {
  test() {
    const data = fetchHttp('https://api.xhuaxs.com/ai/wallpaper.png')

    console.log('%c Line:6 🎂 data', 'color:#f5ce50', data)

    return data
  }
}

export default new HomeApi()
