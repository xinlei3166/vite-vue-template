import qs from 'qs'
import { isObject, isArray } from './is'
import sm3 from './sm3'
import { customAlphabet } from 'nanoid'
import { foreignPhonePattern, phonePattern } from './patterns'

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

// 唯一Id
export function uniqueId(size = 12) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const nanoid = customAlphabet(alphabet, size)
  return nanoid().toLowerCase()
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

export function doSM3(text: String): String {
  return sm3(text)
}

export const randomString = (len: Number): String => {
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
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

export const convertStringToBoolean = (value: string) => {
  return value === 'true' ? true : value === 'false' ? false : value
}
