import { MessagePlugin } from 'tdesign-vue-next'

export const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))

export function typeOf(obj: any) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  // @ts-ignore
  return map[toString.call(obj)]
}

export function validateFields(form: Record<string, any>, messages: Record<string, any>) {
  for (const [k, v] of Object.entries(form)) {
    if (!v) {
      messages[k] && MessagePlugin.error(messages[k])
      return
    }
  }
  return true
}

export function validateSelectedRowKeys(arr: Array<any>, msg = '请选择一条数据') {
  if (!arr.length) {
    MessagePlugin.error(msg)
    return
  }
  return true
}

export function validateSelectedRowKeysWithRowCount(
  arr: Array<any>,
  rowCount = 1,
  msg1 = '请选择一条数据',
  msg2 = '只能同时编辑一条数据'
) {
  if (!arr.length) {
    MessagePlugin.error(msg1)
    return
  }
  if (rowCount && arr.length > rowCount) {
    MessagePlugin.error(msg2)
    return
  }
  return true
}
