<template>
    <div class="content">
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>partnumber</th>
                    <th>description</th>
                    <th>val1</th>
                    <th>val2</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(vc, index) in vchoices" :key="index">
                    <td>
                        {{ vc.id }}
                    </td>

                    <td>
                        <input
                            class="input"
                            :class="{
                                'is-warning':
                                    !vc.delete_scheduled &&
                                    vc.partnumber_changed,
                                'is-danger':
                                    !vc.delete_scheduled &&
                                    vc.partnumber_alarmed,
                            }"
                            type="text"
                            v-model="vchoices[index].partnumber"
                            :disabled="vc.delete_scheduled"
                        />
                    </td>

                    <td>
                        <input
                            class="input"
                            :class="{
                                'is-warning':
                                    !vc.delete_scheduled &&
                                    vc.description_changed,
                            }"
                            type="text"
                            v-model="vchoices[index].description"
                            :disabled="vc.delete_scheduled"
                        />
                    </td>

                    <td>
                        <input
                            class="input"
                            type="number"
                            :class="{
                                'is-warning':
                                    !vc.delete_scheduled && vc.list_changed,
                            }"
                            v-model="vchoices[index].list"
                            :disabled="vc.delete_scheduled"
                        />
                    </td>

                    <td>
                        <input
                            class="input"
                            type="number"
                            :class="{
                                'is-warning':
                                    !vc.delete_scheduled && vc.cost_changed,
                            }"
                            v-model="vchoices[index].cost"
                            :disabled="vc.delete_scheduled"
                        />
                    </td>

                    <td>
                        <input
                            class="checkbox"
                            type="checkbox"
                            v-model="vchoices[index].delete_scheduled"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <button class="button is-primary" @click="add">add</button>
        <button
            class="button is-warning"
            @click="submit"
            :disabled="!update_available"
        >
            update
        </button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SChoice, VChoice } from "./database";

export default Vue.extend({
    data: function () {
        return {
            vchoices: new Array<VChoice>(),
            update_available: false,
        };
    },

    methods: {
        async submit() {
            await this.$store.dispatch("update_choice", this.vchoices);
            this.copy();
        },

        copy() {
            this.vchoices = this.$store.getters.choices.map((c: SChoice) => {
                return c.toVChoice();
            });
        },

        add() {
            this.vchoices.push(new VChoice("", "", 0, 0));
        },

        check() {
            this.update_available = true;
            let counter: { [key: string]: number } = {};
            for (let v of this.vchoices) {
                if (!(v.partnumber in counter)) counter[v.partnumber] = 0;
                if (!v.delete_scheduled) counter[v.partnumber] += 1;
            }

            for (let i = 0; i < this.vchoices.length; i++) {
                const v = this.vchoices[i];
                this.vchoices[i].partnumber_alarmed =
                    1 < counter[v.partnumber] || (!v.delete_scheduled && v.partnumber == "");

                this.update_available &&= !this.vchoices[i].partnumber_alarmed;

                const master: VChoice | undefined =
                    this.$store.getters.choices.find(
                        (c: SChoice) => c.id === v.id
                    );

                if (master === undefined) {
                    this.vchoices[i].partnumber_changed = true;
                    this.vchoices[i].list_changed = true;
                    this.vchoices[i].cost_changed = true;
                    this.vchoices[i].description_changed = true;
                } else {
                    this.vchoices[i].partnumber_changed =
                        v.partnumber != master.partnumber;
                    this.vchoices[i].list_changed = v.list != master.list;
                    this.vchoices[i].cost_changed = v.cost != master.cost;
                    this.vchoices[i].description_changed =
                        v.description != master.description;
                }
            }
        },
    },

    mounted() {
        this.vchoices.push(new VChoice("a", "p", 100, 500));
        this.vchoices.push(new VChoice("b", "q", 200, 600));
        this.vchoices.push(new VChoice("c", "r", 300, 700));
        this.vchoices.push(new VChoice("d", "s", 400, 800));
        this.vchoices.push(new VChoice("e", "t", 500, 900));
        this.vchoices.push(new VChoice("f", "u", 600, 1000));

        this.submit();
    },

    watch: {
        vchoices: {
            handler() {
                this.check();
            },
            deep: true,
        },
    },
});
</script>