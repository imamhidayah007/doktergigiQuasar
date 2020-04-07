import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import VueZoomer from 'vue-zoomer'
import 'vue-zoomer/dist/vue-zoomer.css'
Vue.use(Vuex)
Vue.use(VueZoomer)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
