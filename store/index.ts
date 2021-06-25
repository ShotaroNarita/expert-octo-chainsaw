import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


import choiceModule from './Choice'

const dbname = 'appdb';

const store = new Vuex.Store({
    modules: {
        choices: {
            namespaced: true,
            ...choiceModule
        }
    },

    state: {
        count: 1
    }
})

export default store;