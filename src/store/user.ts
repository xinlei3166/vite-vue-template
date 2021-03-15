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
  changeUserinfo(state: State) {
    state.userinfo.name = '君惜'
  }
}

const actions = {
  setUserinfo(context: ActionContext<State, RootState>) {
    context.commit('changeUserinfo')
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
