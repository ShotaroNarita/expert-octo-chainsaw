<template>
    <div>
        <app-tab></app-tab>

        <div class="section">
            <editor-choice
                v-if="current_mode == CONSTANTS.MODE.CHOICE_EDITOR"
            ></editor-choice>

            <editor-model
                v-if="current_mode == CONSTANTS.MODE.MODEL_EDITOR"
            ></editor-model>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import AppTab from "./AppTab.vue";
import EditorChoice from "./EditorChoice.vue";
import EditorModel from "./EditorModel.vue";
import { CONSTANTS } from "./constants";

export default Vue.extend({
    components: { AppTab, EditorChoice, EditorModel },
    data() {
        return {
            CONSTANTS: CONSTANTS,
        };
    },

    computed: {
        ...mapGetters(["current_mode"]),
    },
});
</script>

<style>
@import "./node_modules/bulma/css/bulma.css";
</style>