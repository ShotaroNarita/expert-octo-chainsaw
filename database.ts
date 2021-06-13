import Dexie from 'dexie';

const dbname = 'AppDB'

export class AppDatabase extends Dexie {
    choices: Dexie.Table<IChoice, string>;
    models: Dexie.Table<IModel, number>;
    relmodelchoices: Dexie.Table<IRelModelChoice, number>;

    constructor() {
        super(dbname);

        this.version(1).stores({
            choices: '&id, description, list, cost',
            // choices: '++id, modelnumber, description, list, cost',
            models: '++id, description, list, cost',
            relmodelchoices: '++id, modelid, choiceid',
        });

        this.choices = this.table("choices");
        // this.choices.mapToClass(Choice);

        this.models = this.table("models");
        // this.models.mapToClass(Model);

        this.relmodelchoices = this.table("relmodelchoices");
        // this.relmodelchoices.mapToClass(RelModelChoice);

    }
}

export interface IChoice {
    id: string; // primary key
    // modelnumber: string; // unique key
    description: string;
    list: number;
    cost: number;
    updated: Date;
}

export class Choice implements IChoice {
    id: string;
    // modelnumber: string = '';
    description = '';
    list = 0;
    cost = 0;
    updated: Date;

    constructor(id: string, description: string, list: number, cost: number) {
        this.id = id;
        // this.modelnumber = modelnumber;
        this.description = description;
        this.list = list;
        this.cost = cost;
        this.updated = new Date();
    }
}

export interface IModel {
    id: number; // primary key
    description: string;
    list: number;
    cost: number;
}

export class Model implements IModel {
    id: number;
    description: string;
    list: number;
    cost: number;

    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
        this.list = 0;
        this.cost = 0;
    }
}

export interface IRelModelChoice {
    modelid: number;
    choiceid: string;
}

export class RelModelChoice implements IRelModelChoice {
    id: number;
    modelid: number;
    choiceid: string;

    constructor(id: number, modelid: number, choiceid: string) {
        this.id = id;
        this.modelid = modelid;
        this.choiceid = choiceid;
    }
}