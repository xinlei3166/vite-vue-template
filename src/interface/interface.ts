export interface Request {
  [key: string]: any
}

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'
export type ResponseData = null | Array<any> | {}

export interface Response {
  code: number | string
  data: ResponseData
}

export interface Pagination {
  size: string
  current: number
  defaultCurrent: number
  pageSize: number
  total: number
  showTotal(total: number | string): string
  showLessItems: boolean
  showQuickJumper: boolean
  showSizeChanger: boolean
  pageSizeOptions: string[]
}
