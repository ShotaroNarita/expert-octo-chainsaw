<template>
    <transition name="fade">
        <div class="my-4 notification is-danger is-light" v-if="seen">
            <button class="delete" @click="show"></button>
            <p>
                <b>
                    {{ info.name }}
                </b>
            </p>
            <p>
                {{ info.message }}
            </p>
        </div>
    </transition>
</template>

<script>
import Vue from "vue";
import { Choice } from "../store/Choice";

export default Vue.extend({
    props: {
        info: Object,
        seen: false,
    },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>