import { message } from 'ant-design-vue'
import axios from 'axios'
import type { Config, RequestsConfig, Method } from '@packages/types'
import { ContentTypeEnum } from '@packages/types/enums'
import { getToken, writeFile, writeBase64File } from '@packages/utils'
// import { useTokenRefresh } from './useTokenRefresh'

const createRequests = (requestsConfig: RequestsConfig = {}) => {
  const baseURL = requestsConfig.baseURL || import.meta.env.VITE_API_URL
  const authorizationKey = requestsConfig.authorizationKey || 'Authorization'
  const errorCodes = requestsConfig.errorCodes || [20004, 20010]
  const codeKey = requestsConfig.codeKey || 'code'
  const messageKey = requestsConfig.messageKey || 'msg'
  const successCode = requestsConfig.successCode || 0
  const errorHandler = requestsConfig.errorHandler
  // const noRefreshToken = requestsConfig.noRefreshToken
  // const refreshTokenApi = requestsConfig.refreshTokenApi

  const service = axios.create({
    baseURL,
    // timeout: 60 * 1000 * 5,
    withCredentials: true, // 允许携带cookie
    headers: {
      // 'Content-Type': ContentTypeEnum.FormURLEncoded,
      // Authorization: 'token',
      'Content-Type': ContentTypeEnum.Json
    },
    requestOptions: {
      withRequestId: false,
      responseType: 'json', // json, blob
      fileName: undefined
    }
  } as Config)

  // const { handleRefreshed } = useTokenRefresh({
  //   authorizationKey,
  //   successCode,
  //   errorHandler,
  //   refreshTokenApi
  // })

  // request 拦截器
  service.interceptors.request.use(
    async config => {
      // config.data = qs.stringify(config.data)
      config.headers = config.headers || {}
      const token = getToken()
      if (token) {
        config.headers[authorizationKey] = `Bearer ${token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // response 拦截器
  service.interceptors.response.use(
    (response: any) => {
      const { responseType } = response?.config?.requestOptions || {}
      if (responseType === 'raw') return response
      if (responseType === 'blob') return response.data
      const { [codeKey]: code, [messageKey]: msg } = response?.data || {}
      if (code && errorCodes.includes(code)) {
        errorHandler?.(msg)
        return response.data
      }
      // token过期，需要续期
      // if (code && code === 20011 && !noRefreshToken) {
      //   return handleRefreshed(service, response.config)
      // }
      if (code && code !== successCode) {
        message.destroy()
        message.error(msg)
      }
      return response?.data
    },
    error => {
      // if (error && error.response) {
      //   error.message = httpMsg[error.response.status] || httpMsg.errorMsg
      // }
      if (error.message) {
        message.destroy()
        message.error(error.message)
      }
      return Promise.reject(error)
    }
  )

  const request = (config: Config): Promise<any> =>
    service
      .request(config)
      .then(res => res)
      .catch(e => console.log(e))

  const get = (url: string, ...args: any): Promise<any> =>
    service
      .get(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const post = (url: string, ...args: any): Promise<any> =>
    service
      .post(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const put = (url: string, ...args: any): Promise<any> =>
    service
      .put(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const patch = (url: string, ...args: any): Promise<any> =>
    service
      .patch(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const _delete = (url: string, ...args: any): Promise<any> =>
    service
      .delete(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const download = (url: string, data: any, config: Config = {}): Promise<any> => {
    let api
    const method = (config.method || 'post') as Method
    if (method === 'get') {
      api = service[method](url, { ...config, params: data })
    } else {
      api = service[method](url, data, config)
    }
    const { fileName, responseType, stringify, cb, blobOptions } = config.requestOptions || {}
    return api
      .then(async (res: any) => {
        cb?.(res)
        let data
        if (responseType === 'blob') {
          data = res
        } else {
          const { code, data: _data } = res
          if (code && code !== successCode) return
          data = stringify ? JSON.stringify(_data) : _data
        }
        const write = responseType === 'base64' ? writeBase64File : writeFile
        await write(fileName as string, data, blobOptions)
        return true
      })
      .catch(e => console.log(e))
  }

  return { request, get, post, put, patch, delete: _delete, download }
}

export const useRequests = createRequests
