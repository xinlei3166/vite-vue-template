//@ts-nocheck
import { useUserStore } from '@/store/user'

export const auth = (permission: string) => {
  const userStore = useUserStore()
  const arr = userStore.permissions
  const permissions = arr.map(x => x.menuCode)
  return permissions.includes(permission)
}

export const pageAuth = async (permission: string) => {
  const userStore = useUserStore()
  let arr = userStore.permissions
  if (!arr.length) {
    await userStore.setPermissions()
    arr = userStore.permissions
  }
  const permissions = arr.map(x => x.menuCode)
  return permissions.includes(permission)
}
