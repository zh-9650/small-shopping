import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

export default createStore({
  plugins: [
    createPersistedState({
      key: 'small-client-pc-124-store',
      paths: ['user', 'cart', 'category']
    })
  ],
  modules: {
    user,
    cart,
    category
  }
})
