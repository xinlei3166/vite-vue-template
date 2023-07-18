import type { Request, Config } from '@packages/types'
// @ts-ignore
import { requests } from '@/api/base'

// 查看手机号
export const getPhone = (config?: Config): Promise<any> =>
  requests.get('/user/user/getUserIdCartAndPhone', config)
