import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import user from './user'

export interface RootState {}

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  modules: { user }
})

export function useStore(): Store<RootState> {
  return baseUseStore(key)
}
