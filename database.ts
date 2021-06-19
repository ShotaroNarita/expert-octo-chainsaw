import Dexie from 'dexie'

export class Choice {
    id?: number;
    pn: string;
    cost: number;

    constructor(pn: string, cost: number) {
        this.pn = pn;
        this.cost = cost;
    }
}

export class Model {
    id?: number;
    desc: string;
    cost: number;

    constructor(desc: string) {
        this.desc = desc;
        this.cost = 0;
    }
}

export class Connection_Model_Choice {
    id?: number;
    model_id: number;
    choice_id: number;

    constructor(model_id: number, choice_id: number) {
        this.model_id = model_id;
        this.choice_id = choice_id;
    }
}

export class Database extends Dexie {
    choices: Dexie.Table<Choice, number>;
    models: Dexie.Table<Model, number>;
    connections_model_choice: Dexie.Table<Connection_Model_Choice, number>;

    constructor(dbname: string) {
        super(dbname);

        this.version(3).stores({
            choices: "++id, &pn, cost",
            models: "++id, desc, cost",
            connections_model_choice: "++id, model_id, choice_id",
        });

        this.choices = this.table('choices')
        this.choices.mapToClass(Choice);

        this.models = this.table('models')
        this.models.mapToClass(Model);

        this.connections_model_choice = this.table('connections_model_choice')
        this.models.mapToClass(Connection_Model_Choice);
    }
}