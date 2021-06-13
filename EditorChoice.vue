<template>
    <div class="content">
        <table>
            <thead>
                <tr>
                    <th v-if="edit_mode">
                        <span v-if="edit_mode"> delete </span>
                    </th>
                    <th>id</th>
                    <th>description</th>
                    <th>val1</th>
                    <th>val2</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(choice, index) in choices" :key="index">
                    <td v-if="edit_mode">
                        <input
                            class="checkbox"
                            type="checkbox"
                            :value="choice.id"
                            :id="choice.id"
                            v-model="delete_candidates"
                            :disabled="!edit_mode"
                        />
                    </td>

                    <td>
                        <input
                            class="input"
                            type="text"
                            v-model="choices[index].id"
                            @blur="check_id_duplication"
                            v-if="edit_mode"
                        />
                        <span v-if="!edit_mode">
                            {{ choices[index].id }}
                        </span>
                    </td>

                    <td>
                        <input
                            class="input"
                            type="text"
                            v-model="choices[index].description"
                            v-if="edit_mode"
                        />
                        <span v-if="!edit_mode">
                            {{ choices[index].description }}
                        </span>
                    </td>

                    <td>
                        <input
                            class="input"
                            type="number"
                            v-model="choices[index].cost"
                            v-if="edit_mode"
                        />
                        <span v-if="!edit_mode">
                            {{ choices[index].cost }}
                        </span>
                    </td>

                    <td>
                        <input
                            class="input"
                            type="number"
                            v-model="choices[index].list"
                            v-if="edit_mode"
                        />
                        <span v-if="!edit_mode">
                            {{ choices[index].list }}
                        </span>
                    </td>
                </tr>

                <tr v-show="edit_mode">
                    <td>
                        <button
                            class="button is-info"
                            v-bind:disabled="!add_available"
                            @click="add_choice"
                        >
                            add
                        </button>
                    </td>
                    <td>
                        <input
                            class="input"
                            type="text"
                            v-model="new_choice.id"
                            @keydown.enter="add_choice"
                        />
                    </td>

                    <td>
                        <input
                            class="input"
                            type="text"
                            v-model="new_choice.description"
                            @keydown.enter="add_choice"
                        />
                    </td>

                    <td>
                        <input
                            class="input"
                            type="number"
                            v-model="new_choice.cost"
                            @keydown.enter="add_choice"
                        />
                    </td>

                    <td>
                        <input
                            class="input"
                            type="number"
                            v-model="new_choice.list"
                            @keydown.enter="add_choice"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <span>
            <button class="button" @click="edit_mode = !edit_mode">
                <span v-if="edit_mode">cancel</span>
                <span v-else>edit</span>
            </button>

            <button
                class="button is-danger"
                :disabled="!edit_mode || delete_candidates.length == 0"
                @click="delete_choices"
            >
                delete
            </button>

            <button class="button is-warning" :disabled="!edit_mode">
                update
            </button>
        </span>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Choice } from "./database";

export default Vue.extend({
    data: function () {
        return {
            edit_mode: false,
            add_available: false,
            update_available: true,
            new_choice: new Choice("", "", 0, 0),
            delete_candidates: [],
        };
    },
    methods: {
        add_choice: function () {
            if (this.add_available) {
                const tmp_coices: Array<Choice> = this.choices;
                tmp_coices.push(this.new_choice);
                this.choices.push(this.new_choice);
                this.$store.dispatch("a_choice_put", tmp_coices);
                this.new_choice = new Choice("", "", 0, 0);
            }
        },

        check_new_id: function () {
            this.add_available =
                this.new_choice.id != "" &&
                !this.choices
                    .map((e: Choice) => e.id)
                    .includes(this.new_choice.id);
        },

        check_id_duplication: function () {
            const id_array: Array<string> = this.choices.map(
                (e: Choice) => e.id
            );
            const id_set: Set<string> = new Set(id_array);

            this.update_available = id_array.length == id_set.size;
        },

        delete_choices: function () {
            console.log(this.delete_candidates);
            this.$store.dispatch("a_choice_delete", this.delete_candidates);
        },
    },

    computed: {
        ...mapGetters(["choices"]),
    },

    watch: {
        new_choice: {
            handler: function () {
                this.check_new_id();
            },
            deep: true,
        },
    },

    mounted: function () {
        // this.$store.dispatch("a_choice_put", [
        //     new Choice("hello1", "description1", 10, 1),
        //     new Choice("hello2", "description2", 20, 1),
        //     new Choice("hello3", "description3", 30, 1),
        // ]);
    },
});
</script>

<style scoped>
th,
td {
    width: 20%;
}
</style>