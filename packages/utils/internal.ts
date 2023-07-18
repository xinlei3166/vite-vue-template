import Cookies from 'js-cookie'

const storageKeyPrefix = import.meta.env.VITE_APP_STORAGE_KEY_PREFIX
export const TokenKey = `${storageKeyPrefix}Token`

export const setToken = (token: string) => Cookies.set(TokenKey, token) // { expires: 1 }
export const getToken = () => Cookies.get(TokenKey)
export const removeToken = () => {
  Cookies.remove(TokenKey)
}
