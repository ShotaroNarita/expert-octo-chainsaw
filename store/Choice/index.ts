import Vuex, { Module } from 'vuex'
import { Connector } from "../types";

export class Choice {
    static label: string = 'choice';
    static schema: string = '++id, &pn, cost';
    id?: number;
    pn: string;
    cost: number;

    constructor(pn: string, cost: number) {
        this.pn = pn;
        this.cost = cost;
    }
}

Connector.use(Choice.label, Choice.schema);

const choiceModule: Module<any, any> = ({
    namespaced: true,

    actions: {
        add: async ({ state }, choice: Choice) => {
            // return await state.db.body.add(choice);
            return await Connector.tables[Choice.label].add(choice);
        },

        get: async ({ state }, id: number): Promise<Choice | undefined> => {
            // return await state.db.body.get(id);
            return await Connector.tables[Choice.label].get(id);
        },

        all: async ({ state }): Promise<Array<Choice> | undefined> => {
            return await Connector.tables[Choice.label].toArray();
        },

        put: async ({ state }, choice: Choice) => {
            // return await state.db.body.put(choice);
            return await Connector.tables[Choice.label].put(choice);

        },

        delete: async ({ state }, id: number) => {
            // return await state.db.body.delete(id);
            return await Connector.tables[Choice.label].delete(id);
        },
    },
});

export default choiceModule;