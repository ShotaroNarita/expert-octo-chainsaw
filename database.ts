import Dexie from 'dexie'

export class Choice{
    id?: number;
    pn: string;
    cost: number;

    constructor(pn: string, cost: number){
        this.pn = pn;
        this.cost = cost;
    }
}

export class Database extends Dexie {
    choices: Dexie.Table<Choice, number>;

    constructor(dbname: string) {
        super(dbname);
        this.version(2).stores({
            choices: "++id, &pn, cost"
        });

        this.choices = this.table('choices')
        this.choices.mapToClass(Choice);
    }
}