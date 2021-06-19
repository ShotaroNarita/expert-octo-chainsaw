<template>
    <div class="content">
        <h1>Model Editor</h1>

        <ul>
            <li v-for="(model, index) in models" :key="index">
                <hr />
                <h6>{{ model.id }} / {{ model.desc }}</h6>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Model } from "./database";
import { CONSTANTS } from "./constants";

export default Vue.extend({
    methods: {},

    async mounted() {
        await this.$store.dispatch(
            CONSTANTS.ACTION.MODEL.ADD,
            new Model("desc")
        );
    },

    computed: {
        ...mapGetters(["models", "choices"]),
    },
});
</script>