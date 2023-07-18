import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday)

// 时间戳格式化
export const formatDatetime = (datetime: dayjs.ConfigType, format?: string) => {
  return datetime ? dayjs(datetime).format(format || 'YYYY-MM-DD HH:mm:ss') : ''
}

// 10位或者13位时间戳格式化成字符串
export const unifiedTimeStamp = (datetime: dayjs.ConfigType, format?: string) => {
  const str = datetime + ''
  const time = str.length === 10 ? +str * 1000 : +str
  return formatDatetime(time, format)
}

// 时间转时间戳(秒)
export const formatTimeStamp = (datetime: dayjs.ConfigType) => {
  return dayjs(datetime).unix()
}

// 获取星期
export const getWeekday = (datetime: dayjs.ConfigType, weekdays?: []) => {
  const cnWeekdays = weekdays || ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const weekday = dayjs(datetime).weekday()
  return cnWeekdays[weekday]
}

// 时分转为分 12:06
export function hourToMinute(time: string): number {
  if (!time || !time.includes(':')) return 0
  const hour = Number(time.split(':')[0])
  const minute = Number(time.split(':')[1])
  return hour * 60 + minute
}

// 秒数转为小时数
export function convertSecondToHour(second: number) {
  return Math.floor(second / 3600)
}

// 秒数转为分钟数
export function convertSecondToMinute(second: number) {
  return Math.floor(second / 60)
}

// 秒数转为时分秒
export function convertSecondToHMS(second: number, ignoreZero = true) {
  if (!second && ignoreZero) return ''
  let hour: string | number = Math.floor(second / 3600)
  hour = hour < 10 ? '0' + hour : hour
  let minute: string | number = Math.floor((second % 3600) / 60)
  minute = minute < 10 ? '0' + minute : minute
  let _second: string | number = Math.floor(second % 60)
  _second = _second < 10 ? '0' + _second : _second
  return [hour, minute, _second].filter(x => x !== null).join(':')
}

// 秒数转为天时分
export function convertSecondToDHM(second: number, ignoreZero = true) {
  if (!second && ignoreZero) return ''
  const daySeconds = 24 * 3600
  const negative = second < 0
  second = Math.abs(second)
  const day: string | number = Math.floor(second / daySeconds)
  const hour: string | number = Math.floor((second % daySeconds) / 3600)
  const minute: string | number = Math.floor(((second % daySeconds) % 3600) / 60)
  return `${negative ? '-' : ''}${day}天${hour}小时${minute}分`
}

// 获取几天后的时间数组
export const getAddDayDatetime = (day: number, useCurrTime = false) => {
  const valueFormatWithTime = 'YYYY-MM-DD HH:mm:ss'
  const valueFormat = 'YYYY-MM-DD'
  const startTime = dayjs()
  const endTime = startTime.add(day, 'day')
  let startTimeStr, endTimeStr
  if (useCurrTime) {
    startTimeStr = startTime.format(valueFormatWithTime)
    endTimeStr = endTime.format(valueFormatWithTime)
  } else {
    startTimeStr = `${startTime.format(valueFormat)} 00:00:00`
    endTimeStr = `${endTime.format(valueFormat)} 23:59:59`
  }
  return [startTimeStr, endTimeStr]
}
