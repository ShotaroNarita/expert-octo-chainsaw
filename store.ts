import Vue from 'vue'
import Vuex from 'vuex'

import { CONSTANTS } from './constants'
import { Choice, Model, Database } from './database'

Vue.use(Vuex);

const dbname = 'appdb';

const store = new Vuex.Store({
    state: {
        database: new Database(dbname),

        // mode
        current_mode: CONSTANTS.MODE.MODEL_EDITOR,

        // choice editor
        choices: new Array<Choice>(),

        // model editor
        models: new Array<Model>(),
    },

    mutations: {
        // mode
        [CONSTANTS.MUTATION.MODE.UPDATE]: function (state, next_mode: string) {
            console.log('mode changed');
            state.current_mode = next_mode;
        },

        // choice
        [CONSTANTS.MUTATION.CHOICE.UPDATE]: function (state, latest_choice: Array<Choice>) {
            console.log('choice committed!')
            state.choices = latest_choice;
        },

        // choice
        [CONSTANTS.MUTATION.MODEL.UPDATE]: function (state, latest_model: Array<Model>) {
            console.log('model committed!')
            console.log(latest_model);
            state.models = latest_model;
        }
    },

    getters: {
        // MODE
        current_mode: state => state.current_mode,

        // choices
        choices: state => state.choices,

        // models
        models: state => state.models,

    },

    actions: {
        // mode
        [CONSTANTS.ACTION.MODE.PUT]: async function ({ commit, state }, next_mode: string) {
            if (CONSTANTS.MODE.LIST.includes(next_mode)) {
                commit(CONSTANTS.MUTATION.MODE.UPDATE, next_mode);
            } else {
                console.log(next_mode, 'doesnt exists!');
            }
        },

        // choices
        [CONSTANTS.ACTION.CHOICE.DELETE]: async function ({ commit, state }, choice_id_deleted: number): Promise<void> {
            await state.database.choices.delete(choice_id_deleted);
            await this.dispatch(CONSTANTS.ACTION.CHOICE.GET);
            return;
        },

        [CONSTANTS.ACTION.CHOICE.ADD]: async function ({ commit, state }, choice_added: Choice): Promise<void> {
            await state.database.choices.add(choice_added);
            await this.dispatch(CONSTANTS.ACTION.CHOICE.GET);
            return;
        },

        [CONSTANTS.ACTION.CHOICE.PUT]: async function ({ commit, state }, choice_updated: Choice): Promise<void> {
            await state.database.choices.put(choice_updated);
            await this.dispatch(CONSTANTS.ACTION.CHOICE.GET);
            return;
        },

        [CONSTANTS.ACTION.CHOICE.GET]: async function ({ commit, state }): Promise<void> {
            const latest_choice: Array<Choice> = await state.database.choices.toArray();
            commit(CONSTANTS.MUTATION.CHOICE.UPDATE, latest_choice);
            return;
        },

        //models
        [CONSTANTS.ACTION.MODEL.DELETE]: async function ({ commit, state }, id_deleted: number): Promise<void> {
            await state.database.models.delete(id_deleted);
            await this.dispatch(CONSTANTS.ACTION.MODEL.GET);
            return;
        },

        [CONSTANTS.ACTION.MODEL.ADD]: async function ({ commit, state }, model_added: Model): Promise<void> {
            await state.database.models.add(model_added);
            await this.dispatch(CONSTANTS.ACTION.MODEL.GET);
            return;
        },

        [CONSTANTS.ACTION.MODEL.PUT]: async function ({ commit, state }, model_updated: Model): Promise<void> {
            await state.database.models.put(model_updated);
            await this.dispatch(CONSTANTS.ACTION.MODEL.GET);
            return;
        },

        [CONSTANTS.ACTION.MODEL.GET]: async function ({ commit, state }): Promise<void> {
            const latest_models: Array<Model> = await state.database.models.toArray();
            commit(CONSTANTS.MUTATION.MODEL.UPDATE, latest_models);
            return;
        },
    },
})

export default store;