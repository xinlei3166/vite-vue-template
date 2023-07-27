export const kebabCase = (str: string) => str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)

// /^(color|font|line|link|motion|border|margin|padding(?!con)|screen((?!min|max).)*$|boxShadow(?!pop|dra|tab|car))/
// /^(blue|purple|cyan|green|magenta|pink|red|orange|yellow|volcano|geekblue|gold|lime)/
export function generateCssVars(token: any, prefix = 'ant', keys?: Array<string>) {
  const pattern =
    /^(blue|purple|cyan|green|magenta|pink|red|orange|yellow|volcano|geekblue|gold|lime)/i
  const pxPattern = /(size|width|radius|margin|screen|padding)/i
  keys = keys || Object.keys(token).filter(([key]) => !pattern.test(key))
  const cssVars = keys.map(
    key => `--${prefix}-${kebabCase(key)}: ${token[key]}${pxPattern.test(key) ? 'px' : ''}`
  )
  return cssVars.join(';\n')
}

export function getCssVars(token: any, prefix = 'ant') {
  const pattern =
    /^(blue|purple|cyan|green|magenta|pink|red|orange|yellow|volcano|geekblue|gold|lime)/i
  const keys = Object.keys(token).filter(([key]) => !pattern.test(key))
  return keys.map(key => ({ [key]: `--${prefix}-${kebabCase(key)}` }))
}

const excludedKeys = /^(colorWhite|colorDark)/
export function generateColorCssVars(token: any, prefix = 'ant') {
  const pattern =
    /^(blue|purple|cyan|green|magenta|pink|red|orange|yellow|volcano|geekblue|gold|lime)/i
  const pxPattern = /(size|width|radius|margin|screen|padding)/i
  const keys = Object.keys(token).filter(
    key => !pattern.test(key) && key.startsWith('color') && !excludedKeys.test(key)
  )
  const cssVars = keys.map(
    key => `--${prefix}-${kebabCase(key)}: ${token[key]}${pxPattern.test(key) ? 'px' : ''}`
  )
  return cssVars.join(';\n')
}

// 获取 antd token 生成的 css 变量(color开头的token), colorPrimary -> { primary: var(--ant-color-primary) }
export function getColorCssVars(token: any, prefix = 'ant') {
  const keys = Object.keys(token).filter(k => k.startsWith('color') && !excludedKeys.test(k))
  return keys.reduce((prev: Record<string, any>, value: string) => {
    let shortKey = value.replace('color', '')
    shortKey = shortKey.replace(shortKey[0], shortKey[0].toLowerCase())
    prev[shortKey] = `var(--${prefix}-${kebabCase(value)})`
    return prev
  }, {})
}
