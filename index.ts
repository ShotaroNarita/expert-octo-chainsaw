import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
    el: '#app',
    store,
    components: { App },
    mounted: function () {
        this.$store.dispatch('a_choice_get')
    }
});

