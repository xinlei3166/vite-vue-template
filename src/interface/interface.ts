export interface Request {
  [key: string]: any
}

export type Data = null | Array<any> | {}

export interface Response {
  code: number | string
  data: Data
}
