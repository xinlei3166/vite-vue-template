import { auth } from '@packages/utils'

// 权限，适用于 btn-group 和 单个按钮
export function usePermissions(permissions: string[]) {
  const perms = permissions.reduce((prev: any, permission: string) => {
    prev[permission] = !!auth(permission)
    return prev
  }, {})

  // hasPermission 表示至少拥有一个权限
  return { permissions: perms, hasPermission: Object.values(perms).some(p => p) }
}
