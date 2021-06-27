<template>
    <div class="content">
        <h1 class="title">Skeleton Editor</h1>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>val1</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(chs, index) in skeletons" :key="index">
                    <td>
                        {{ chs.id }}
                    </td>

                    <td>
                        {{ chs.desc }}
                    </td>
                </tr>

                <tr>
                    <td>-</td>
                    <td>
                        <input
                            class="input"
                            type="text"
                            v-model="skeleton_added.desc"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="button is-primary is-outlined" @click="add_skeleton">
            add
        </button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Skeleton } from "../store/Skeleton";

export default Vue.extend({
    data() {
        return {
            skeletons: new Array<Skeleton>(),
            skeleton_added: new Skeleton(""),
        };
    },

    async mounted() {
        this.skeletons = await this.all();
    },

    methods: {
        async all(): Promise<Array<Skeleton>> {
            return await this.$store.dispatch("skeletons/all");
        },

        async get(id: number): Promise<Skeleton> {
            return await this.$store.dispatch("skeletons/get", id);
        },

        async put(skeleton: Skeleton): Promise<void> {
            return await this.$store.dispatch("skeletons/put", skeleton);
        },

        async add(skeleton: Skeleton): Promise<void> {
            return await this.$store
                .dispatch("skeletons/add", skeleton)
                .catch((err) => {
                    console.log(err);
                });
        },

        async delete(id: number): Promise<void> {
            return await this.$store.dispatch("skeletons/delete", id);
        },

        async add_skeleton() {
            this.add(this.skeleton_added);

            this.skeleton_added = new Skeleton("");
            this.skeletons = await this.all();
        },
    },
});
</script>