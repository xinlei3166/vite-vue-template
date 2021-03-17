import requests, { Config } from '../lib/requests'

export function getData(data: any, config?: Config) {
  return requests.post('/api/table/data', data, config)
}
