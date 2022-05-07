import { topCategory } from '../../api/constats'
import { findAllCategory } from '../../api/category'

export default {
  // 分类模块
  namespaced: true,
  state() {
    return {
      list: topCategory.map(item => ({ name: item }))
    }
  },
  actions: {
    async getList({ commit }) {
      const data = await findAllCategory()
      commit('setList', data.result)
      data.result.forEach(item => {
        item.open = false
      })
      // console.log(data.result)
    }
  },
  mutations: {
    setList(state, payload) {
      state.list = payload
      // console.log(state.list)
      // console.log(payload)
    },
    show(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  }
}
