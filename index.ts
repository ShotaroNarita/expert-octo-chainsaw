// import Dexie from 'dexie';

import Vue from 'vue'

// const dbname = 'AppDB'

// Get list of database
// Dexie.getDatabaseNames().then(dbs => {
//     console.log("dbs: ", dbs)
// }).catch((err) => {

// }).finally(() => {

// });

// Dexie.delete(dbname).then(() => {
//     console.log("Database successfully deleted");
// }).catch((err) => {
//     console.error("Could not delete database");
// }).finally(() => {
//     // Do what should be done next...
// });

// class AppDatabase extends Dexie {
//     choices: Dexie.Table<IChoice, string>;
//     models: Dexie.Table<IModel, number>;
//     relmodelchoices: Dexie.Table<IRelModelChoice, number>;

//     constructor() {
//         super(dbname);

//         this.version(1).stores({
//             choices: 'id, description, list, cost',
//             models: 'id, description, list, cost',
//             relmodelchoices: 'id, modelid, choiceid',
//         });

//         this.choices = this.table("choices");
//         this.choices.mapToClass(Choice);

//         this.models = this.table("models");
//         this.models.mapToClass(Model);

//         this.relmodelchoices = this.table("relmodelchoices");
//         this.relmodelchoices.mapToClass(RelModelChoice);

//     }
// }

// interface IChoice {
//     id: string; // primary key
//     description: string;
//     list: number;
//     cost: number;
// }

// class Choice implements IChoice {
//     id: string = '';
//     description = '';
//     list = 0;
//     cost = 0;

//     constructor(id: string, description: string, list: number, cost: number) {
//         this.id = id;
//         this.description = description;
//         this.list = list;
//         this.cost = cost;
//     }
// }

// interface IModel {
//     id: number; // primary key
//     description: string;
//     list: number;
//     cost: number;
// }

// class Model implements IModel {
//     id: number;
//     description: string;
//     list: number;
//     cost: number;

//     constructor(id: number, description: string) {
//         this.id = id;
//         this.description = description;
//         this.list = 0;
//         this.cost = 0;
//     }
// }

// interface IRelModelChoice {
//     modelid: number;
//     choiceid: string;
// }

// class RelModelChoice implements IRelModelChoice {
//     id: number;
//     modelid: number;
//     choiceid: string;

//     constructor(id: number, modelid: number, choiceid: string) {
//         this.id = id;
//         this.modelid = modelid;
//         this.choiceid = choiceid;
//     }
// }

// import {AppDatabase, Choice, RelModelChoice, Model} from './database'

// const db = new AppDatabase();

// db.choices.clear();
// db.models.clear();
// db.relmodelchoices.clear();

// const choicenum = 20;
// const modelnum = 8;

// for (let i = 0; i < choicenum; i++) {
//     db.choices.add(new Choice(`hoge`, 'hoge', i * 27 + 34, i * 100 + 78));
// }

// for (let i = 0; i < modelnum; i++) {
//     db.models.add(new Model(i, `model${i}`));
// }

// for (let i = 0; i < modelnum; i++) {
//     for (let j = 0; j < 6; j++) {
//         const selected_choice_id = 'choice' + Math.floor(Math.random() * choicenum);
//         db.relmodelchoices.add(new RelModelChoice(i * modelnum + j, i, selected_choice_id));
//     }
// }

import EditorChoice from './EditorChoice.vue'

import store from './store'

new Vue({
    el: '#app',
    store,
    components: { EditorChoice },
    mounted: function () {
        this.$store.dispatch('a_choice_get')
    }
});

