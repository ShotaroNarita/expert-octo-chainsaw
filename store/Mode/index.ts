import Vuex, { Module } from 'vuex'

const modeModule: Module<any, any> = ({
    namespaced: true,

    state: {
        list: ['choice', 'skeleton', 'graph'],
        current: 'choice'
    },

    mutations: {
        change(state, next: string){
            if(state.list.includes(next)){
                state.current = next;
            }
        }
    },
});

export default modeModule;