<template>
    <div class="section">
        <editor-choice></editor-choice>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import EditorChoice from "./EditorChoice.vue";

export default Vue.extend({
    components: { EditorChoice },
});
</script>

<style>
@import "./node_modules/bulma/css/bulma.css";
</style>