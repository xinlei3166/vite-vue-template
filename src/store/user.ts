import { Module, ActionContext } from 'vuex'
import { RootState } from './index'

export interface State {
  userinfo: {
    name: string
    age: string
  }
}

const state = (): State => {
  const userinfo = { name: '', age: 'male' }
  return { userinfo }
}

const getters = {}

const mutations = {
  changeUserinfo(state: State, name: string) {
    state.userinfo.name = name
  }
}

const actions = {
  setUserinfo(context: ActionContext<State, RootState>, name: string) {
    context.commit('changeUserinfo', name)
  }
}

const store: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default store
