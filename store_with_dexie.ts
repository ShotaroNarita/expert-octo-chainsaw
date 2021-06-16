// import Vue from 'vue'
// import Vuex from 'vuex'
// import { AppDatabase, Choice } from './database';

// Vue.use(Vuex);

// const store = new Vuex.Store({
//     state: {
//         choices: new Array<Choice>(),
//         db: new AppDatabase()
//     },

//     mutations: {
//         update_choice: (state, choices_processed: Array<Choice>) => {
//             state.choices = choices_processed;
//             // console.log('updated!', state.choices);
//             // console.log('updated!', choices_processed);
//         },
//     },

//     getters: {
//         choices: state => state.choices,
//         // findChoice: state => (id: string) => state.choices.find(e => e.id == id),
//     },

//     actions: {
//         a_choice_put: ({ commit, state }, payload: Array<Choice>) => {
//             return new Promise<void>((resolve, reject) => {
//                 state.db.transaction('rw', state.db.choices, () => {
//                     state.db.choices.clear().then(() => {
//                         state.db.choices.bulkPut(payload).then(() => {
//                             state.db.choices.toArray().then((choice_array) => {
//                                 // console.log('action choice put', choice_array);
//                                 choice_array.sort((e1: Choice, e2: Choice) => e1.updated < e2.updated ? -1 : 1)
//                                 commit('update_choice', choice_array)
//                                 resolve();
//                             })
//                         }).catch(err => {
//                             console.log(err)
//                         })
//                     });
//                 })
//             });
//         },

//         // a_choice_delete: ({ commit, state }, payload: Array<string>) => {
//         //     return new Promise<void>((resolve, reject) => {
//         //         state.db.transaction('rw', state.db.choices, () => {
//         //             state.db.choices.bulkDelete(payload).then(() => {
//         //                 state.db.choices.toArray().then((choice_array) => {
//         //                     choice_array.sort((e1: Choice, e2: Choice) => e1.updated < e2.updated ? -1 : 1)
//         //                     commit('update_choice', choice_array)
//         //                     resolve();
//         //                 })
//         //             })
//         //         })
//         //     });
//         // },

//         a_choice_get: ({ commit, state }) => {
//             return new Promise<void>((resolve, reject) => {
//                 state.db.choices.toArray().then((choice_array) => {
//                     state.choices = choice_array;
//                     commit('update_choice', choice_array);
//                     resolve();
//                 })
//             });
//         }
//     }
// });

// export default store;