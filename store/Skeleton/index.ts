import Vuex, { Module } from 'vuex'
import { Connector } from "../types";

export class Skeleton {
    static label: string = 'skeleton';
    static schema: string = '++id, desc';
    id?: number;
    desc: string;

    constructor(desc: string) {
        this.desc = desc;
    }
}

Connector.use(Skeleton.label, Skeleton.schema);

const skeletonModule: Module<any, any> = ({
    namespaced: true,

    actions: {
        add: async ({ state }, skeleton: Skeleton) => {
            return await Connector.tables[Skeleton.label].add(skeleton);
        },

        get: async ({ state }, id: number): Promise<Skeleton | undefined> => {
            return await Connector.tables[Skeleton.label].get(id);
        },

        all: async ({ state }): Promise<Array<Skeleton> | undefined> => {
            return await Connector.tables[Skeleton.label].toArray();
        },

        put: async ({ state }, skeleton: Skeleton) => {
            return await Connector.tables[Skeleton.label].put(skeleton);

        },

        delete: async ({ state }, id: number) => {
            return await Connector.tables[Skeleton.label].delete(id);
        },
    },
});

export default skeletonModule;