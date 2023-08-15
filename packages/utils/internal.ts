import Cookies from 'js-cookie'

// @ts-ignore
import router from '@/router'
// @ts-ignore
import { useUserStore } from '@/store/user'
// @ts-ignore
import { useMenuStore } from '@/store/menu'

const storageKeyPrefix = import.meta.env.VITE_APP_STORAGE_KEY_PREFIX
export const TokenKey = `${storageKeyPrefix}Token`

export const setToken = (token: string) => Cookies.set(TokenKey, token) // { expires: 1 }
export const getToken = () => Cookies.get(TokenKey)
export const removeToken = () => {
  Cookies.remove(TokenKey)
}

// logout
export const logoutCleanup = () => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  router.push('/login')
  removeToken()
  userStore.cleanup()
  menuStore.cleanup()
}
