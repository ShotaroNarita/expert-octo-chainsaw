<template>
    <div class="content">
        <h1>Choice Editor</h1>

        <table class="table">
            <!-- <tbody is="transition-group"> -->
            <tbody>
                <tr v-for="(uc, index) in uichoices" :key="uc.vid">
                    <td>
                        {{ uc.id == undefined ? "-" : uc.id }}
                    </td>

                    <td>
                        <input
                            class="input"
                            :class="stchoices[index].status_pn.flag"
                            type="text"
                            v-model="uichoices[index].pn"
                            :disabled="uichoices[index].flag_deleted"
                        />
                    </td>

                    <td>
                        <input
                            class="input"
                            :class="stchoices[index].status_cost.flag"
                            type="text"
                            v-model="uichoices[index].cost"
                            :disabled="uichoices[index].flag_deleted"
                        />
                    </td>

                    <td>
                        <input
                            type="checkbox"
                            class="checkbox"
                            v-model="uichoices[index].flag_deleted"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <button class="button is-primary" @click="add_choice">add</button>

        <button
            class="button is-warning"
            @click="put_choice"
            :disabled="!update_available"
        >
            save
        </button>

        <button class="button is-success" @click="restore">restore</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Choice } from "./database";
import { CONSTANTS } from './constants'


class ItemStatus {
    flag: string = "";
    message: string = "";

    set_warning(message: string) {
        this.flag = "is-warning";
        this.message = message;
    }

    set_danger(message: string) {
        this.flag = "is-danger";
        this.message = message;
    }

    set_info(message: string) {
        this.flag = "is-info";
        this.message = message;
    }

    clear() {
        this.flag = "";
        this.message = "";
    }
}

class STChoice {
    status_pn: ItemStatus = new ItemStatus();
    status_cost: ItemStatus = new ItemStatus();
}

class UIChoice extends Choice {
    static count: number = 0;
    vid: number;
    flag_deleted: boolean = false;
    constructor(c: Choice) {
        super(c.pn, c.cost);
        this.id = c.id;

        this.vid = UIChoice.count;
        UIChoice.count += 1;
    }

    toChoice() {
        const c = new Choice(this.pn, this.cost);
        c.id = this.id;
        return c;
    }
}

export default Vue.extend({
    data: function () {
        return {
            uichoices: new Array<UIChoice>(),
            stchoices: new Array<STChoice>(),
            update_available: true,
        };
    },

    methods: {
        add_choice: async function () {
            this.uichoices.push(new UIChoice(new Choice("", 0)));
            this.stchoices.push(new STChoice());
        },

        put_choice: async function () {
            for (let i in this.uichoices) {
                const s = this.stchoices[i];
                const u = this.uichoices[i];

                try {
                    if (u.flag_deleted) {
                        if (u.id != undefined)
                            await this.$store.dispatch(CONSTANTS.ACTION.CHOICE.DELETE, u.id);
                    } else {
                        await this.$store.dispatch(CONSTANTS.ACTION.CHOICE.PUT, u.toChoice());
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            return this.copy();
        },

        delete_choice: async function (deleted_id: number) {
            await this.$store.dispatch(CONSTANTS.ACTION.CHOICE.DELETE, deleted_id);
            this.copy();
        },

        copy: function () {
            this.uichoices = new Array();

            this.uichoices = this.$store.getters.choices.map(
                (c: Choice) => new UIChoice(c)
            );
            this.stchoices = this.uichoices.map(
                (_: UIChoice) => new STChoice()
            );
        },

        check() {
            this.update_available = true;

            const counter: { [key: string]: number } = {};
            for (let i in this.uichoices) {
                const u = this.uichoices[i];
                const s = this.stchoices[i];

                if (!u.flag_deleted) {
                    if (!(u.pn in counter)) counter[u.pn] = 0;
                    counter[u.pn] += 1;
                }
            }

            for (let i in this.uichoices) {
                const u = this.uichoices[i];
                this.stchoices[i].status_pn.clear();
                this.stchoices[i].status_cost.clear();

                if (this.uichoices[i].flag_deleted) {
                    continue;
                }

                const cp = this.choices.find((e: Choice) => e.id == u.id);
                if (cp == undefined) {
                    this.stchoices[i].status_pn.set_warning("new item");
                    this.stchoices[i].status_cost.set_warning("new item");
                } else {
                    if (cp.pn != u.pn)
                        this.stchoices[i].status_pn.set_warning(
                            "update needed"
                        );
                    else this.stchoices[i].status_pn.clear();

                    if (cp.cost != u.cost)
                        this.stchoices[i].status_cost.set_warning(
                            "update needed"
                        );
                    else this.stchoices[i].status_cost.clear();
                }

                if (u.pn === "") {
                    this.stchoices[i].status_pn.set_danger("blank not allowed");
                }

                if (1 < counter[u.pn]) {
                    this.stchoices[i].status_pn.set_danger(
                        "duplicated part number"
                    );
                }

                this.update_available = !this.stchoices.some(
                    (s: STChoice, i: number) =>
                        !this.uichoices[i].flag_deleted &&
                        s.status_pn.flag === "is-danger"
                );
                // this.update_available &&= this.uichoices.every(
                //     (u: UIChoice) => u.pn !== ""
                // );
            }
        },

        restore: async function () {
            await this.$store.dispatch(CONSTANTS.ACTION.CHOICE.GET);
            await this.copy();
            await this.check();
        },
    },

    mounted: async function () {
        await this.restore();
    },

    computed: {
        ...mapGetters(["choices"]),
    },

    watch: {
        uichoices: {
            handler: function () {
                this.check();
            },
            deep: true,
        },
    },
});
</script>

<style scoped>
.v-leave-active,
.v-enter-active {
    transition: opacity 0.2s;
}
.v-enter,
.v-leave-to {
    opacity: 0;
}
</style>