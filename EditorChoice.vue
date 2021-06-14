<template>
    <div class="content">
        <table class="table is-hover">
            <thead>
                <tr>
                    <th>id</th>
                    <th>description</th>
                    <th>val1</th>
                    <th>val2</th>
                    <th v-if="edit_mode">
                        <span v-if="edit_mode"> delete </span>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(choice, index) in choices" :key="index">
                    <td>
                        <input
                            class="input"
                            :class="{
                                'is-warning': is_modified_field(index).id,
                                'is-danger':
                                    check_id_duplication().includes(
                                        choice.id
                                    ) || choice.id == '',
                            }"
                            :disabled="delete_candidates.includes(choice.id)"
                            type="text"
                            v-model="choices[index].id"
                            v-if="edit_mode"
                            @blur="1 /*check_id_duplication*/"
                        />
                        <span v-if="!edit_mode">
                            {{ choices[index].id }}
                        </span>
                    </td>

                    <td>
                        <input
                            class="input"
                            :class="{
                                'is-warning': is_modified_field(index)
                                    .description,
                            }"
                            :disabled="delete_candidates.includes(choice.id)"
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
                            :class="{
                                'is-warning': is_modified_field(index).cost,
                            }"
                            :disabled="delete_candidates.includes(choice.id)"
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
                            :class="{
                                'is-wƒarning': is_modified_field(index).list,
                            }"
                            :disabled="delete_candidates.includes(choice.id)"
                            type="number"
                            v-model="choices[index].list"
                            v-if="edit_mode"
                        />
                        <span v-if="!edit_mode">
                            {{ choices[index].list }}
                        </span>
                    </td>

                    <td v-if="edit_mode">
                        <label>
                            <input
                                class="checkbox is-danger"
                                type="checkbox"
                                :value="choice.id"
                                :id="choice.id"
                                v-model="delete_candidates"
                                :disabled="!edit_mode"
                            />
                        </label>
                    </td>
                </tr>

                <tr v-show="edit_mode">
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

                    <td>
                        <button class="button is-info" @click="add_choice">
                            add
                        </button>
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
                class="button is-warning"
                :disabled="!edit_mode || !update_available"
                @click="update_choice"
            >
                update
            </button>

            <button class="button is-primary" @click="dump()">dump</button>
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
            update_available: true,
            new_choice: new Choice("", "", 0, 0),
            delete_candidates: new Array<string>(),
            choices: new Array<Choice>(),
        };
    },
    methods: {
        add_choice: function () {
            this.choices.push(this.new_choice);
            this.new_choice = new Choice("", "", 0, 0);
        },

        update_choice: function () {
            this.$store
                .dispatch(
                    "a_choice_put",
                    this.choices.filter(
                        (e: Choice) => !this.delete_candidates.includes(e.id)
                    )
                )
                .then(() => {
                    this.copy_master();
                    this.delete_candidates = new Array();
                });
        },

        check_id_duplication: function (): Array<string> {
            let counter: { [key: string]: number } = {};

            this.choices.forEach((e: Choice) => {
                if (!(e.id in counter)) counter[e.id] = 0;
                counter[e.id] += 1;
            });

            let dups: Array<string> = [];
            let include_blank_id = false;
            for (let key in counter) {
                if (key == "") include_blank_id = true;
                if (counter[key] >= 2) dups.push(key);
            }

            this.update_available = dups.length == 0 && !include_blank_id;
            return dups;
        },

        is_modified_field: function (
            index: number
        ): { [key: string]: boolean } {
            let rev: { [key: string]: boolean } = {
                id: true,
                description: true,
                cost: true,
                list: true,
            };

            if (index < this.$store.getters.choices.length) {
                const current_choice = this.choices[index];
                const master_choice = this.$store.getters.choices[index];

                rev.id = current_choice.id != master_choice.id;
                rev.cost = current_choice.cost != master_choice.cost;
                rev.list = current_choice.list != master_choice.list;
                rev.description =
                    current_choice.description != master_choice.description;
            }

            return rev;
        },

        dump() {
            console.clear();
            console.log("==master==");
            for (let i in this.$store.getters.choices) {
                const cm = this.$store.getters.choices[i];
                console.log(cm.id, cm.description, cm.cost, cm.list);
            }

            console.log("--choice---");
            for (let i in this.choices) {
                const cm = this.choices[i];
                console.log(cm.id, cm.description, cm.cost, cm.list);
            }

            console.log("delete candidate", this.delete_candidates);
        },

        copy_master() {
            this.choices = this.$store.getters.choices.map(
                (e: Choice) => new Choice(e.id, e.description, e.list, e.cost)
            );
        },
    },

    mounted: function () {
        this.$store.dispatch("a_choice_get").then(() => {
            this.copy_master();
            this.dump();
        });
    },
});
</script>

<style scoped>
th,
td {
    width: 20%;
}
</style>