import Vue from 'vue'
import Vuex from 'vuex'

// import actions from 'constants'
import { Choice, Database } from './database'

Vue.use(Vuex);

const dbname = 'appdb';

const store = new Vuex.Store({
    state: {
        choices: new Array<Choice>(),
        database: new Database(dbname),
    },

    mutations: {
        'choice/update': function (state, latest_choice: Array<Choice>) {
            console.log('committed!')
            state.choices = latest_choice;
        }
    },

    getters: {
        choices: state => state.choices,
    },

    actions: {
        'choice/delete': async function ({ commit, state }, choice_id_deleted: number): Promise<void> {
            await state.database.choices.delete(choice_id_deleted);
            await this.dispatch('choice/get');
            return;
        },

        'choice/add': async function ({ commit, state }, choice_added: Choice): Promise<void> {
            await state.database.choices.add(choice_added);
            await this.dispatch('choice/get');
            return;
        },

        'choice/put': async function ({ commit, state }, choice_updated: Choice): Promise<void> {
            await state.database.choices.put(choice_updated);
            await this.dispatch('choice/get');
            return;
        },

        'choices/put': async function ({ commit, state }, choices_updated: Array<Choice>): Promise<void> {
            await state.database.choices.bulkPut(choices_updated);
            await this.dispatch('choice/get');
            return;
        },

        'choice/get': async function ({ commit, state }): Promise<void> {
            const latest_choice: Array<Choice> = await state.database.choices.toArray();
            commit('choice/update', latest_choice);
            return;
        },
    },
})

export default store;