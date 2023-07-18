import type { Request, Response, Config } from '@packages/types'
import { requests } from './base'

// 用户当前菜单列表
export const getUserMenu = (config?: Config): Promise<any> =>
  requests.get('/api/mock/user/menu', config)

// 权限列表-扁平化
export const getPermissions = (config?: Config): Promise<any> =>
  requests.get('/api/mock/user/permissions', config)

// 用户当前菜单列表
export const getUserinfo = (config?: Config): Promise<any> =>
  requests.get('/api/mock/user/info', config)

// 普通用户登录
export const login = (data?: Request) => requests.post('/api/mock/user/login', data)

// 退出登录
export const logout = () => requests.post('/api/mock/user/logout')
