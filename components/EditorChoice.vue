<template>
    <div class="content">
        <h1>editor choice</h1>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Choice } from "../store/Choice";

export default Vue.extend({
    async mounted() {
        console.log("mounted in editor choice");
        await this.$store.dispatch("choices/put", new Choice("hoge", 2));
        const re = await this.$store.dispatch("choices/all");
        console.log(re);
    },
});
</script>

