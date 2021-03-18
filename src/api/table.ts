import requests, { Config } from '../lib/requests'
import { Request, Response } from '../interface'

export function getData(data: Request, config?: Config): Promise<Response> {
  return requests.post('/api/table/data', data, config)
}
