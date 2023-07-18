/***
 * 并集
 * a: [1,2,3], b: [3,5,2]
 * unionSet(a,b) = [1,2,3,5]
 * */
export function unionSet(a: [], b: []) {
  const a1 = new Set(a)
  const b1 = new Set(b)
  return new Set([...a1, ...b1])
}

/***
 * 交集
 * a: [1,2,3], b: [3,5,2]
 * intersectionSet(a,b) = [2,3]
 * */
export function intersectionSet(a: [], b: []) {
  const a1 = new Set(a)
  const b1 = new Set(b)
  return new Set([...a1].filter(x => b1.has(x)))
}

/***
 * 差集
 * a: [1,2,3], b: [3,5,2]
 * differenceABSet(a,b) = [1]
 * */
export function differenceABSet(a: [], b: []) {
  const a1 = new Set(a)
  const b1 = new Set(b)
  return new Set([...a1].filter(x => !b1.has(x)))
}

// 去重
export function arrayDedupe(array: any[]) {
  const a1 = new Set(array)
  return Array.from(a1)
}
