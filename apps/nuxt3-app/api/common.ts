import type { Request, Response, Config } from '@packages/types'
import { requests } from './base'

export function getQcloudTmpkeys(data: Request, config?: Config): Promise<Response> {
  return requests.post('/api/getQcloudTmpkeys', data, config)
}
