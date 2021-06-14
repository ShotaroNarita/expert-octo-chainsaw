<template>
    <div class="section">
        <editor-choice></editor-choice>
    </div>
</template>

<script lang="ts">
import EditorChoice from "./EditorChoice.vue";
import Vue from "vue";
export default Vue.extend({
    components: { EditorChoice },
});
</script>

<style>
    @import './node_modules/bulma/css/bulma.css';
</style>