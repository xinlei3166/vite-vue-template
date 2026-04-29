// 带http[s]前缀的标准url
export const urlPattern = /^https?:\/\/[^\s]+$/

// 手机号
export const phonePattern = /^1[23456789]\d{9}$/

// 外国手机号
export const foreignPhonePattern = /^\d+-?(\*{3,4}|\d{4})\d+$/

// 外国手机号
export const foreignPhoneSimplePattern = /^\d+-?\d+$/

// 邮箱
export const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/

// 身份证号
export const idCardPattern =
  /^[1-9]\d{5}(18|19|20|21)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// 验证码
export const codePattern = /^\d{6}$/ // 验证码

// 名字
export const namePattern = /^[\u4e00-\u9fa5.]{2,15}$/ // 姓名 2-15位汉字，可以包含"·"

// 中文
export const chinesePattern = /^[\u4e00-\u9fa5]/

// 数字
export const numberPattern = /^[0-9]*$/

// 账号
export const usernamePattern = /^[a-zA-Z0-9_-]{4,20}$/ // 用户名长度4-20，允许字母、数字、下划线和连字符

// 密码
export const passwordPattern = /^\w{6,30}$/ // 密码6-30位字符

// 签约密码
export const signPasswordPattern = /^\d{6}$/

// 信用代码
export const creditCodePattern = /^[0-9a-zA-Z]{18}$/ // 信用代码 18位数字，可以包含字母

// 组织机构代码
export const organizationCodePattern = /^[0-9a-zA-Z]{1,18}$/ // 机构代码 18位以内数字，可以包含字母

// 银行卡号
export const bankCardNumberPattern = /^([1-9]\d{10,24})$/ // 银行卡号\打款账号

// 开户支行
export const bankNamePattern = /.{2,50}/ // 开户支行

// 部门名称
export const departmentNamePattern = /^[\u4e00-\u9fa5]{2,10}$/ // 部门名称

// 应用名称
export const applicationNamePattern = /^[A-Za-z0-9\u4e00-\u9fa5]{1,20}$/ // 应用名称

// 印章名称
export const sealNamePattern = /^[\u4e00-\u9fa5]{1,20}$/ // 印章名称，20字以内中文

// 邮政编码
export const postalCodePattern = /^[1-9][0-9]{5}$/ // 邮政编码

// ip地址
export const checkIp =
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

// 端口号
export const portPattern =
  /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

// 表单验证：空格校验
export const validateEmpty = (value: any) => {
  let errMsg = '不能为空字符'
  if (value === '') {
    return { result: false, message: errMsg, type: 'error' }
  } else if (value.trim() === '') {
    return { result: false, message: errMsg, type: 'error' }
  } else if (/(^\s)|(\s$)/.test(value)) {
    errMsg = '前后不能有空格'
    return { result: false, message: errMsg, type: 'error' }
  } else {
    return { result: true, type: 'success' }
  }
}

// 校验ip段
export function testIpList(value: any) {
  const errMsg = new Error('ip格式错误')
  if (!value) {
    return { result: false, message: errMsg, type: 'error' }
  }
  try {
    let flag = true
    value
      .split(',')
      .map((item: any) => item.trim())
      .filter((item: any) => item)
      .forEach((ip: any) => {
        // 如果不包含端口
        if (ip.indexOf(':') === -1) {
          if (!checkIp.test(ip)) {
            flag = false
            return { result: false, message: errMsg, type: 'error' }
          }
        } else {
          // 同时校验端口和ip
          const ipPort = ip.split(':')
          if (!checkIp.test(ipPort[0])) {
            flag = false
            return { result: false, message: errMsg, type: 'error' }
          }
          if (!portPattern.test(ipPort[1])) {
            flag = false
            return { result: false, message: errMsg, type: 'error' }
          }
        }
      })
    if (flag) {
      return { result: true, type: 'success' }
    }
  } catch {
    return { result: false, message: errMsg, type: 'error' }
  }
}

export function validDeptName(deptName: string) {
  const reg = /^[A-Za-z0-9\u4E00-\u9FA5\u2E80-\uFE4F()（）”“+"-]+$/ // 可输入英文，数字，汉字
  return reg.test(deptName)
}

export function validDeptCode(deptCode: string) {
  const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
  return reg.test(deptCode)
}

export function validOperatorName(name: string) {
  const reg = /^[\u4e00-\u9fa5-\u2E80-\uFE4F]{1,50}$/
  return reg.test(name)
}

export function validOperatorPhone(phone: string) {
  const reg = /^(1[3-9])\d{9}$/
  return reg.test(phone)
}
