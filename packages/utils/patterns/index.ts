export const regPhone = /^1\d{10}$/ // 手机号
export const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export const regpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/ // 密码8-20位字符，包含大小写字母、数字
export const regIDCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证号
export const regCode = /^\d{6}$/ // 验证码
export const regSignPassword = /^\d{6}$/ // 签约密码
export const regName = /^[\u4e00-\u9fa5\.]{2,15}$/ // 姓名 2-15位汉字，可以包含“·”
export const regCreditCode = /^[0-9a-zA-Z]{18}$/ // 信用代码 18位数字，可以包含字母
export const regUserPass = /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,30}$/ // 用户密码
export const regOrganizationcCode = /^[0-9a-zA-Z]{1,18}$/ // 机构代码 18位以内数字，可以包含字母
export const regBankCardNumber = /^([1-9]\d{10,24})$/ // 银行卡号\打款账号
export const regBankName = /.{2,50}/ // 开户支行
export const regDepartmentName = /^[\u4e00-\u9fa5]{2,10}$/ // 部门名称
export const regApplicationName = /^[A-Za-z0-9\u4e00-\u9fa5]{1,20}$/ // 应用名称
export const regSealName = /^[\u4e00-\u9fa5]{1,20}$/ // 印章名称，20字以内中文
export const regPostalCode = /^[1-9][0-9]{5}$/ // 邮政编码
export const regChina = /[^\u4E00-\u9FA5]$/ // 中文

// 带http[s]前缀的标准url正则
export const urlPattern = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/

// 手机号正则
export const phonePattern = /^1[123456789]\d(\*{4}|\d{4})\d{4}$/

// 手机号正则
export const phoneRegular = /^1[123456789]\d{9}$/

// 外国手机号正则
export const foreignPhonePattern = /^\d+-?(\*{3,4}|\d{4})\d+$/

// 外国手机号正则
export const foreignPhoneRegular = /^\d+-?\d+$/

// 邮箱正则
export const emailPattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/

// 数字
export const numberPattern = /^[0-9]*$/

// 中文
export const chinesePattern = /^[\u4e00-\u9fa5]/

export const checkIp =
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

export const portPattern =
  /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

// 表单验证：空格校验
export const validateEmpty = (_rule: any, value: any, callback: any) => {
  let errMsg = '不能为空字符'
  if (value === '') {
    callback(new Error(errMsg))
  } else if (value.trim() === '') {
    callback(new Error(errMsg))
  } else if (/(^\s)|(\s$)/.test(value)) {
    errMsg = '前后不能有空格'
    callback(new Error(errMsg))
  } else {
    callback()
  }
}

// 校验ip段
export function testIpList(_rule: any, value: any, callback: any) {
  const errMsg = new Error('ip格式错误')
  if (!value) {
    callback(errMsg)
    return
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
            callback(errMsg)
            flag = false
            return
          }
        } else {
          // 同时校验端口和ip
          const ipPort = ip.split(':')
          if (!checkIp.test(ipPort[0])) {
            callback(errMsg)
            flag = false
            return
          }
          if (!portPattern.test(ipPort[1])) {
            callback(errMsg)
            flag = false
            return
          }
        }
      })
    if (flag) {
      callback()
    }
  } catch (e) {
    callback(errMsg)
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
  return regPhone.test(phone)
}
