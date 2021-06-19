<template>
    <div>
        <div class="tabs is-boxed">
            <ul>
                <li
                    v-for="(mode, index) in MODE"
                    :key="index"
                    :class="{ 'is-active': $store.getters.current_mode == mode }"
                >
                    <a @click="change_mode(mode)">
                        {{ mode }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CONSTANTS } from "./constants";

export default Vue.extend({
    data() {
        return {
            MODE: CONSTANTS.MODE.LIST,
        };
    },

    methods: {
        async change_mode(next_mode: string) {
            await this.$store.dispatch(CONSTANTS.ACTION.MODE.PUT, next_mode);
        },
    },
});
</script>