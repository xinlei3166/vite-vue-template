import Cookies from 'js-cookie'
// @ts-ignore
import router from '@/router'
// @ts-ignore
import { useMenuStore } from '@/store/menu'
// @ts-ignore
import { useUserStore } from '@/store/user'

const storageKeyPrefix = import.meta.env.VITE_APP_STORAGE_KEY_PREFIX

export const TokenKey = `${storageKeyPrefix}Token`
export const setToken = (token: string) => Cookies.set(TokenKey, token) // { expires: 1 }
export const getToken = () => Cookies.get(TokenKey)
export const removeToken = () => {
  Cookies.remove(TokenKey)
  Cookies.remove(RefreshTokenKey)
}

export const RefreshTokenKey = `${storageKeyPrefix}RefreshToken`
export const setRefreshToken = (token: string) => Cookies.set(RefreshTokenKey, token) // { expires: 1 }
export const getRefreshToken = () => Cookies.get(RefreshTokenKey)

export const setLocalValue = (key: string, value: any, stringify = false) => {
  let val = value
  if (val && stringify) {
    val = JSON.stringify(val)
  }
  localStorage.setItem(`${storageKeyPrefix}${key}`, val)
}
export const getLocalValue = (key: string, parse = false) => {
  let val = localStorage.getItem(`${storageKeyPrefix}${key}`)
  if (val && parse) {
    val = JSON.parse(val as string)
  }
  return val
}
export const removeLocalValue = (key: string) => {
  return localStorage.removeItem(`${storageKeyPrefix}${key}`)
}

// logout
export const logoutCleanup = () => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  removeToken()
  router.push('/login')
  userStore.cleanup()
  menuStore.cleanup()
}
