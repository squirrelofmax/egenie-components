import egFetch from '../egFetch'
import { extendObservable, action, observable } from 'mobx'

export const cache = observable({// columnsConfig的缓存，全局用
  value: {},
  setCache: action(({cacheKey, cacheValue}) => {
    cache.setStorage({ cacheKey, cacheValue })
    if (cache.value[cacheKey] && cache.value[cacheKey] === cacheValue) return
    cache.value = { ...cache.value, [cacheKey]: cacheValue }
  }),
  setStorage: action(({ cacheKey, cacheValue }) => {
    const item = localStorage.getItem(cacheKey)
    if (!item || item !== cacheValue) localStorage.setItem(cacheKey, cacheValue)
  })
})

export async function getUser () {
  if (!getUser.cache) {
    const myInit = {
      method: 'GET',
      credentials: 'include'
    }
    const url = '/api/dashboard/user'
    getUser.cache = egFetch(url, myInit)
  }
  const response = await getUser.cache
  const result = response || { status: 'Failed', data: '网络错误：获取用户信息失败，请联系管理员！' }
  console.log(result)
  return result
}

export async function saveColumnsConfig (data) {
  cache.setCache(data)
  data = `cacheKey=${data.cacheKey}&cacheValue=${data.cacheValue}`
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  }
  const url = '/api/dashboard/cache/save'

  const response = await egFetch(url, myInit)
  let result = response || { status: 'Failed', data: '网络错误：保存表格列配置失败，请联系管理员！' }
  console.log(result)
  if (result.status !== 'Failed') { result = { status: 'Successful', data: result } }
  return result
}

export async function getColumnsConfig (params) {
  const item = localStorage.getItem(params)
  if (item) return {status: 'Successful', data: item}
  if (!getColumnsConfig.cache) getColumnsConfig.cache = {}
  if (!getColumnsConfig.cache[params]) {
    const myInit = {
      method: 'GET',
      credentials: 'include'
    }
    const url = '/api/dashboard/cache/get?cacheKey=' + params
    getColumnsConfig.cache[params] = egFetch(url, myInit)
  }
  const response = await getColumnsConfig.cache[params]
  const result = response || { status: 'Failed', data: '网络错误：获取表格列配置失败，请联系管理员！' }
  console.log(result)
  return result
}
