import type { Request, Response, Config } from '@packages/types'
import { requests } from './base'

export function getOssStsToken(data?: Request, config?: Config): Promise<Response> {
  return requests.post('/oss/sts_token', data, config)
}

export function getCosStsToken(data?: Request, config?: Config): Promise<Response> {
  return requests.post('/cos/sts_token', data, config)
}
