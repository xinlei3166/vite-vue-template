type typeName = 'Object' | 'String' | 'Function' | 'Array'

export function is(val: unknown, type: typeName) {
  return toString.call(val) === `[object ${type}]`
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isString(val: any): val is Record<any, any> {
  return val !== null && is(val, 'String')
}

export function isFunction(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Function')
}

export function isArray(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Array')
}
