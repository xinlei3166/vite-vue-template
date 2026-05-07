import dayjs from 'dayjs'
import { customAlphabet } from 'nanoid'
import qs from 'qs'
import { formatDatetime, unifiedTimeStamp } from './datetime'
import { isObject, isArray } from './is'
import { foreignPhonePattern, phonePattern } from './patterns'
import sm3 from './sm3'

/**
 * 获取url 参数的方法
 * @param {*} item 为参数的键
 */
export const getUrlData = function (item: string) {
  const search = window.location.href.split('?')[1]
  return (qs.parse(search)[item] || '') as string
}

// to
export function to(promise: any) {
  return promise
    .then((res: Record<string, any>) => {
      if (res.code) {
        return res.code === 0 ? [null, res] : [res, null]
      } else {
        return [null, res]
      }
    })
    .catch((err: any) => [err, null])
}

// 第一个字段与第二个字段的百分比
export function calculatePercentage(num1: number, num2: number) {
  if (num1 === null || num2 === null) return ''
  const num = num1 / num2
  return num >= 1 ? '100%' : (num * 100).toFixed(2) + '%'
}

export function calculatePercentageInt(num1: number, num2: number) {
  if (num1 === null || num2 === null) return ''
  const num = num1 / num2
  return num >= 1 ? '100%' : Math.floor(num * 100) + '%'
}

/**
 * 由生日计算年龄  精确到月份
 * @param birthday
 * @param sMonth
 */
export const getAge = (birthday: number | string, sMonth = true): string => {
  let _birthday
  if (Object.prototype.toString.call(birthday) === '[object Number]') {
    _birthday = unifiedTimeStamp(birthday, 'YYYY-MM-DD')
  } else if (Object.prototype.toString.call(birthday) === '[object String]') {
    const b = birthday as string
    _birthday = b.split(' ')[0]
  }
  if (!_birthday) return ''
  const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/
  const birthdayArr = _birthday.match(reg)
  const today = formatDatetime(new Date(), 'YYYY-MM-DD')
  const todayArr = today.match(reg)
  const T1 = (todayArr && Number(todayArr[1])) || 0
  const B1 = (birthdayArr && Number(birthdayArr[1])) || 0
  const T3 = (todayArr && Number(todayArr[3])) || 0
  const B3 = (birthdayArr && Number(birthdayArr[3])) || 0
  const T4 = (todayArr && Number(todayArr[4])) || 0
  const B4 = (birthdayArr && Number(birthdayArr[4])) || 0
  let days = 0
  let month = 0
  let year = 0
  days = T4 - B4
  if (days < 0) {
    month = -1
  }
  month += T3 - B3
  if (month < 0) {
    year = -1
    month = 12 + month
  }
  year += T1 - B1
  const yearStr = year > 0 ? year + '岁' : ''
  const mnthStr = month > 0 ? month + '个月' : ''
  return sMonth ? `${yearStr} ${mnthStr}` : `${yearStr}`
}

export const isMobile = () => {
  return navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
}

// 对象数组转为对象
export function convertArrayToObject(
  arr: Record<string, any>[],
  options = { labelKey: 'value', valueKey: 'key' }
) {
  const obj: Record<string, any> = {}
  for (const item of arr) {
    obj[item[options.valueKey]] = item[options.labelKey]
  }
  return obj
}

// 手机号脱敏
export function hiddenPhone(phone: string | number) {
  const _phone = String(phone || '')
  if (phonePattern.test(_phone) || foreignPhonePattern.test(_phone)) {
    return _phone.substr(0, 3) + '****' + _phone.substr(7)
  }
  return _phone
}

// 获取对象深度key
export function getPropByPath(obj: Record<string, any>, path: string | string[]) {
  let tempObj = obj
  const keyArr = [].concat(path as any)
  let i = 0
  for (i; i < keyArr.length - 1; i++) {
    const key = keyArr[i]
    tempObj = tempObj[key]
  }

  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj?.[keyArr[i]]
  }
}

// 对象数组去重
export function uniqueObjArr(
  arr: Record<string, any>[],
  key: string | string[]
): Record<string, any>[] {
  const obj: Record<string, any> = {}

  return arr.reduce((previous: any, current: any) => {
    const prop = getPropByPath(current, key)
    obj[prop.v] ? '' : (obj[prop.v] = previous.push(current))
    return previous
  }, [])
}

// 生成唯一 ID
export function generateUniqueId(size = 21, alphabet?: string, upperCase = false) {
  const _alphabet = alphabet || '0123456789abcdefghijklmnopqrstuvwxyz'
  const customNanoid = customAlphabet(_alphabet, size)
  const id = customNanoid()
  return upperCase ? id.toUpperCase() : id
}

// 生成任务 ID
export function generateTaskId(size?: number, format = 'YYYYMMDDHHmmss') {
  return `${dayjs().format(format)}_${generateUniqueId(size)}`
}

// 扁平化对象数组
export const flattenDeepObjArr = (arr: any[], deepKey = 'children') => {
  return arr.reduce((previous, current) => {
    previous.push({ ...current, [deepKey]: undefined })
    if (current[deepKey]?.length) {
      previous.push(...flattenDeepObjArr(current[deepKey], deepKey))
    }
    return previous
  }, [])
}

// 名称拼接 a/b/c
export const joinStr = (arr: string[], separator = '/') => arr.join(separator)

export function doSM3(text: string): string {
  return sm3(text)
}

export const randomString = (len: number): string => {
  len = len || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export function deepMerge(src: any = {}, target: any = {}) {
  let key
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function deepClone(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  } else if (obj && typeof obj === 'object') {
    const cloned: any = {}
    const keys = Object.keys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i]
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  } else {
    return obj
  }
}

// 像素px转换
export function unitConversion() {
  const div = document.createElement('div') as any
  div.id = 'unit_mm'
  div.style.cssText =
    'width:1mm;height:1mm;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
  ;(document.querySelector('body') as any).appendChild(div)
  const { width } = (document.getElementById('unit_mm') as any).getBoundingClientRect()
  div.parentNode.removeChild(div)
  return width
}

// 过滤请求参数('-1', '', undefined, null)
export function clearEmptyParam(config: any) {
  ;['data', 'params'].forEach(item => {
    const itemValue = config[item] // 参数对象
    if (itemValue) {
      const keys = Object.keys(itemValue) // 参数数组
      if (keys.length) {
        keys.forEach(key => {
          if (isArray(itemValue[key]) && itemValue[key].length === 0) {
            Reflect.deleteProperty(itemValue, key)
          }
          if (['', undefined, null].includes(itemValue[key])) {
            Reflect.deleteProperty(itemValue, key)
          }
        })
      }
    }
  })
}

// 获取地址栏参数
export function getParameter(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// 从 Content-Disposition 中获取文件名
export function getFileNameFromContentDisposition(contentDisposition?: string): string {
  if (!contentDisposition) return ''

  // 1. 优先 filename*=UTF-8''xxx
  const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)
  if (filenameStarMatch?.[1]) {
    return decodeURIComponent(filenameStarMatch[1].trim())
  }

  // 2. fallback: filename="xxx"
  const filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/i)
  if (filenameMatch?.[1]) {
    return decodeURIComponent(filenameMatch[1].trim())
  }

  return ''
}

// json
export function isJSON(str: any) {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch {
      return false
    }
  } else {
    return false
  }
}

// 字符串转为布尔值
export const convertStringToBoolean = (value: string) => {
  return value === 'true' ? true : value === 'false' ? false : value
}

// 将字符串转换为 kebab-case
export const kebabCase = (str: string) => {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
}

// tree name format
export const formatTreeName = (str: string) => {
  if (!str) return ''
  return str.replaceAll('/', ' / ')
}

// 根据路径设置对象值
export function setByPath(obj: Record<string, any>, path: string, value: any) {
  const keys = path.split('.')
  let cur = obj

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cur[key] = value
    } else {
      cur[key] ||= {}
      cur = cur[key]
    }
  })
}

// 提取对象剩余属性
export function extractRest<T extends Record<string, any>, K extends readonly (keyof T)[]>(
  item: T,
  excludeKeys: K
) {
  const rest = { ...item }

  excludeKeys.forEach(key => {
    delete rest[key]
  })

  return rest as Omit<T, K[number]>
}

// 更优雅的拼接url片段
export function joinUrl(...paths: string[]): string {
  return paths
    .filter(Boolean)
    .map((part, index) => {
      if (index === 0) {
        // 第一个保留协议头（https://）
        return part.replace(/\/+$/, '')
      }
      return part.replace(/^\/+|\/+$/g, '')
    })
    .join('/')
}

// 优雅地拼接路径片段，并可控制是否移除开头的 '/'
export function joinPath(segments: string[], removeLeadingSlash = false) {
  let result = segments
    .filter(segment => segment) // 过滤掉空字符串
    .join('/') // 用 '/' 连接所有片段
  if (removeLeadingSlash) {
    result = result.replace(/^\/+/, '') // 移除开头所有的 '/'
  }
  return result
}

// 去掉字符串首尾引号 "\"c2d0daeb2bf7bd62c1a7972db4be9098\""
export function stripQuotes(value?: string): string {
  return value?.replace(/^['"]+|['"]+$/g, '') || ''
}

// 格式化时长，显示为 mm:ss 或 hh:mm:ss
export function formatDuration(ms: number): string {
  if (!ms || ms < 0) return '00:00'

  const totalSeconds = Math.max(1, Math.floor(ms / 1000))

  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60

  const pad = (n: number) => String(n).padStart(2, '0')

  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`
  return `${pad(m)}:${pad(s)}`
}
