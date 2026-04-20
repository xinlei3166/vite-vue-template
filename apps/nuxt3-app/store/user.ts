import { defineStore } from 'pinia'
import { getPermissions, getUserinfo } from '@/api'

const storageKeyPrefix = import.meta.env.VITE_APP_STORAGE_KEY_PREFIX

export interface UserState {
  hasLogin: boolean
  isAdmin: boolean
  userinfo: Record<string, any>
  permissions: Record<string, any>[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({ hasLogin: false, isAdmin: false, userinfo: {}, permissions: [] }),
  getters: {
    HasLogin(state) {
      return state.hasLogin
    },
    IsAdmin(state) {
      return state.isAdmin
    },
    Userinfo(state) {
      return state.userinfo
    },
    Permissions(state) {
      return state.permissions
    }
  },
  actions: {
    async setHasLogin(boolean: boolean) {
      this.hasLogin = boolean
    },
    async setIsAdmin(boolean: boolean) {
      this.isAdmin = boolean
    },
    async setUserinfo() {
      const res: any = await getUserinfo()
      if (!res || res.code !== 0) return
      this.setHasLogin(true)
      this.setIsAdmin(res.data.user_type === 2)
      this.userinfo = res.data
    },
    async setPermissions() {
      const res: any = await getPermissions()
      if (!res || res.code !== 0) return
      this.permissions = res.data
    },
    async cleanup() {
      this.setHasLogin(false)
      this.setIsAdmin(false)
      this.userinfo = {}
      this.permissions = []
    }
  },
  persist: {
    key: storageKeyPrefix + 'User',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
})
