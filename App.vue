<template>
    <div>
        <h1>hello world</h1>
        <editor-choice></editor-choice>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorChoice from "./components/EditorChoice.vue";

export default Vue.extend({
    components: {
        EditorChoice,
    },
});
</script>

<style>
@import "./node_modules/bulma/css/bulma.css";
</style>