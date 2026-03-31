import type { RequestsConfig } from '@packages/types'
import { setToken, getRefreshToken } from '@packages/utils'

let isRefreshing = false
let requestsQueue: Array<(token: string) => void> = []

interface UseTokenRefreshOptions {
  authorizationKey?: RequestsConfig['authorizationKey']
  successCode?: RequestsConfig['successCode']
  errorHandler?: RequestsConfig['errorHandler']
  refreshTokenApi?: RequestsConfig['refreshTokenApi']
}
export const useTokenRefresh = (options: UseTokenRefreshOptions = {}) => {
  const authorizationKey = options.authorizationKey || 'Authorization'
  const successCode = options.successCode || 0
  const errorHandler = options.errorHandler
  const refreshTokenApi = options.refreshTokenApi

  // 核心逻辑：处理过期并返回新的请求结果
  const handleRefreshed = async (service: any, config: any) => {
    if (!isRefreshing) {
      isRefreshing = true
      try {
        const refreshToken = getRefreshToken()
        // 情况 A: 连 Refresh Token 都没有，直接走人
        if (!refreshToken) throw new Error('No Refresh Token')

        const res = await refreshTokenApi?.({ refreshToken })
        if (res?.code === successCode) {
          const { access_token } = res.data
          setToken(access_token)
          isRefreshing = false
          const currentQueue = [...requestsQueue]
          currentQueue.forEach(cb => cb(access_token))
          requestsQueue = []
          config.headers[authorizationKey!] = `Bearer ${access_token}`
          // 重新执行当前请求
          return service.request(config)
        } else {
          // 情况 B: 后端返回了非成功状态码（比如 Refresh 也过期了）
          throw new Error('Refresh Token Expired')
        }
      } catch (error) {
        isRefreshing = false
        requestsQueue = []
        // 此处可以触发全局退出事件
        errorHandler?.('登录超时')
        return Promise.reject(error)
      }
    } else {
      // 正在刷新中，挂起当前请求
      return new Promise(resolve => {
        requestsQueue.push((token: string) => {
          config.headers[authorizationKey] = `Bearer ${token}`
          resolve(service.request(config))
        })
      })
    }
  }

  return { handleRefreshed }
}
