import Mock from 'mockjs'
import qs from 'qs'
import { genPhone } from './utils'

// 获取 mock.Random 对象
const Random = Mock.Random

export const getUserMenu = function (options: Record<string, any> = {}) {
  const body: Record<string, any> = qs.parse(options.body)
  const arr: any[] = []
  return {
    code: 0,
    data: {
      list: arr,
      total: 0
    }
  }
}

export const getPermissions = function (options: Record<string, any> = {}) {
  const body: Record<string, any> = qs.parse(options.body)
  const arr: any[] = []
  return {
    code: 0,
    data: {
      list: arr,
      total: 0
    }
  }
}

export const getUserinfo = function (options: Record<string, any> = {}) {
  const body: Record<string, any> = qs.parse(options.body)
  const data = {
    id: Random.integer(1, 99),
    name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
    phone: genPhone(), // Random.cname() 随机生成一个手机号码
    email: Random.email(), // Random.cname() 随机生成一个邮箱地址
    age: Random.integer(1, 99), //  Random.integer( min, max )
    hobby: Random.csentence(5, 30), //  Random.csentence( min, max )
    updateTime: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式, 默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    img: Random.dataImage('300x250', 'mock的图片') // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
  }

  return {
    code: 0,
    data
  }
}

export const login = function (options: Record<string, any> = {}) {
  const body: Record<string, any> = qs.parse(options.body)
  return {
    code: 0,
    data: {
      accessToken: Random.guid()
    }
  }
}

export const logout = function (options: Record<string, any> = {}) {
  const body: Record<string, any> = qs.parse(options.body)
  return {
    code: 0
  }
}
