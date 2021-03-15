import dayjs from 'dayjs'

export const formatDatetime = (datetime: dayjs.ConfigType, format?: string) => {
  return dayjs(datetime).format(format || 'YYYY-MM-DD HH:mm:ss')
}
