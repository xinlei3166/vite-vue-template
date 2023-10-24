import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export interface RequestsConfig {
  baseURL?: string
  AuthorizationKey?: string
  errorCodes?: Array<string | number>
  codeKey?: string
  messageKey?: string
  successCode?: string | number
  errorHandler?: Function
}

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface RequestOptions {
  withRequestId?: boolean
  responseType?: 'json' | 'blob' | 'base64' | 'raw'
  stringify?: boolean
  cb?: Function
  fileKey?: string
  fileName?: string
  blobOptions?: Record<string, any>
}

export interface RequestConfig {
  requestOptions?: RequestOptions
  [key: string]: any
}
export type Config = RequestConfig & AxiosRequestConfig
export type InternalConfig = RequestConfig & InternalAxiosRequestConfig

export interface Request {
  [key: string]: any
}

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'
export type ResponseData = null | Array<any> | Record<string, any>

export interface Response {
  code: number | string
  data: ResponseData

  [key: string]: any
}
