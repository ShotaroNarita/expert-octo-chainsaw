<template>
    <div>
        <app-tab></app-tab>

        <div class="section">
            <transition name="fade" mode="out-in">
                <editor-choice
                    v-if="$store.state.modes.current == 'choice'"
                ></editor-choice>

                <editor-skeleton
                    v-if="$store.state.modes.current == 'skeleton'"
                ></editor-skeleton>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorChoice from "./components/EditorChoice.vue";
import EditorSkeleton from "./components/EditorSkeleton.vue";
import AppTab from "./components/AppTab.vue";

export default Vue.extend({
    components: {
        EditorChoice,
        EditorSkeleton,
        AppTab,
    },
});
</script>

<style>
@import "./node_modules/bulma/css/bulma.css";

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>