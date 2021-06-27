<template>
    <div class="content">
        <h1 class="title">Choice Editor</h1>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>pn</th>
                    <th>val1</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="chs in choices" :key="chs.id">
                    <td>
                        {{ chs.id }}
                    </td>

                    <td>
                        {{ chs.pn }}
                    </td>

                    <td>
                        {{ chs.cost }}
                    </td>
                </tr>

                <tr :key="-1">
                    <td>-</td>
                    <td>
                        <input
                            class="input"
                            type="text"
                            v-model="choice_added.pn"
                        />
                    </td>
                    <td>
                        <input
                            class="input"
                            type="number"
                            v-model="choice_added.cost"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="button is-primary is-outlined" @click="add_choice">
            add
        </button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Choice } from "../store/Choice";

export default Vue.extend({
    data() {
        return {
            choices: new Array<Choice>(),
            choice_added: new Choice("", 0),
        };
    },

    async mounted() {
        this.choices = await this.all();
    },

    methods: {
        async all(): Promise<Array<Choice>> {
            return await this.$store.dispatch("choices/all");
        },

        async get(id: number): Promise<Choice> {
            return await this.$store.dispatch("choices/get", id);
        },

        async put(choice: Choice): Promise<void> {
            return await this.$store.dispatch("choices/put", choice);
        },

        async add(choice: Choice): Promise<void> {
            return await this.$store
                .dispatch("choices/add", choice)
                .catch((err) => {
                    console.log(err);
                });
        },

        async delete(id: number): Promise<void> {
            return await this.$store.dispatch("choices/delete", id);
        },

        async add_choice() {
            this.add(this.choice_added);
            this.choice_added = new Choice("", 0);
            this.choices = await this.all();
        },
    },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>