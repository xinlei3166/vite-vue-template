import { defineStore } from 'pinia'

const storageKeyPrefix = import.meta.env.VITE_APP_STORAGE_KEY_PREFIX

export interface StoreState {
  userinfo: {
    name: string
  }
}

export const useStore = defineStore('store', {
  state: (): StoreState => ({ userinfo: { name: '' } }),
  getters: {
    Userinfo(state) {
      return state.userinfo
    }
  },
  actions: {
    setUserinfo(userinfo: Partial<StoreState['userinfo']>) {
      this.userinfo = { ...this.userinfo, ...userinfo }
    }
  },
  persist: {
    key: storageKeyPrefix + 'Store',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
})
