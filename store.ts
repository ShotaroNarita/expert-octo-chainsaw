import Vue from 'vue'
import Vuex from 'vuex'
import { SChoice, VChoice } from './database';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        choices: new Array<SChoice>(),
    },

    mutations: {
        update_choice: (state, vchoices: Array<VChoice>) => {
            state.choices = vchoices.filter(v => !v.delete_scheduled).map(v => v.toSChoice());
        },
    },

    getters: {
        choices: state => state.choices,
    },

    actions: {
        update_choice: ({ commit, state }, payload: Array<VChoice>) => {
            return new Promise<void>((resolve, reject) => {
                // validate payload: Array<Vchoice> comparing with Array<SChoice>

                // save to indexeddb
                commit('update_choice', payload);

                resolve();
            });
        }
    },

});

export default store;