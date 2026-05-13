import { useRequests } from '@packages/lib'
import type { Request } from '@packages/types'
import { logoutCleanup } from '@packages/utils'

const errorHandler = (msg: string) => {
  logoutCleanup({ msg })
}

const baseURL = import.meta.env.VITE_API_URL

// 刷新令牌
const pureRequests = useRequests({ baseURL, errorHandler, noRefreshToken: true })
export const refreshTokenApi = (data?: Request) =>
  pureRequests.post('/user/refresh_token', { refresh_token: data?.refreshToken })

export const requests = useRequests({ baseURL, errorHandler, refreshTokenApi })
