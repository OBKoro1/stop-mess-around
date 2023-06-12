import Vuex from 'vuex'
import Vue from 'vue'
import { utils } from '@/utils/utils-index'

Vue.use(Vuex)
const store = new Vuex.Store({
  state() {
    return {
      config: {},
    }
  },
  mutations: {
    updateConfig(state, payload) {
      console.log(payload)
      state.config = payload
    },
  },
  actions: {
    async asyncGetConfig(context) {
      const config = await utils.getConfig()
      context.commit('updateConfig', config)
    },
    async asyncUpdateConfig(context, [val, key]) {
      return new Promise(async (resolve, reject) => {
        try {
          await utils.updateStorageKey(val, key)
          context.commit('updateConfig', { ...context.state.config, [key]: val })
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    },
  },
})

export default store
