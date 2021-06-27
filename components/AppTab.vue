<template>
    <div>
        <div class="tabs">
            <ul>
                <li
                    :class="{
                        'is-active': mode == $store.state.modes.current,
                    }"
                    v-for="(mode, index) in modes"
                    :key="index"
                    @click="change_mode(mode)"
                >
                    <a>{{ mode }}</a>
                </li>
            </ul>
        </div>

        <!-- <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a
                    role="button"
                    class="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item is-active"> Home </a>
                    <a class="navbar-item"> Documentation </a>
                    <a
                        class="navbar-item"
                        :class="{
                            'is-active': mode == $store.state.modes.current,
                        }"
                        v-for="(mode, index) in modes"
                        :key="index"
                        @click="change_mode(mode)"
                    >
                        {{ mode }}
                    </a>
                </div>
            </div>
        </nav> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../store";
export default Vue.extend({
    data() {
        return {
            modes: this.$store.state.modes.list,
        };
    },

    methods: {
        change_mode(next_mode: string) {
            this.$store.commit("modes/change", next_mode);
        },
    },
});
</script>