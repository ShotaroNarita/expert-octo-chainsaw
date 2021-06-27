import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import choiceModule from './Choice'
import skeletonModule from './Skeleton'
import modeModule from './Mode'
import { Connector } from './types';

Connector.lock();

const store = new Vuex.Store({
    modules: {
        skeletons: skeletonModule,
        choices: choiceModule,
        modes: modeModule,
    },
})

export default store;