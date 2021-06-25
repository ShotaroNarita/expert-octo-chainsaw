import Vuex, { Module } from 'vuex'
import { Connector } from "../types";

export class Choice {
    id?: number;
    pn: string;
    cost: number;

    constructor(pn: string, cost: number) {
        this.pn = pn;
        this.cost = cost;
    }
}

const choiceModule: Module<any, any> = ({
    namespaced: true,

    state: {
        db: new Connector<Choice>('app', 'choice', '++id, &pn, cost'),
        mio: 1,
    },

    actions: {
        add: async ({ state }, choice: Choice) => {
            return await state.db.body.add(choice);
        },

        get: async ({ state }, id: number): Promise<Choice | undefined> => {
            return await state.db.body.get(id);
        },

        all: async ({ state }): Promise<Array<Choice> | undefined> => {
            return await state.db.body.toArray();
        },

        put: async ({ state }, choice: Choice) => {
            return await state.db.body.put(choice);
        },

        delete: async ({ state }, id: number) => {
            return await state.db.body.delete(id);
        },
    },
});

export default choiceModule;