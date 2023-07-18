import { defineStore } from 'pinia'

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
    enabled: true,
    strategies: [
      {
        key: 'store',
        storage: localStorage
      }
    ]
  }
})
