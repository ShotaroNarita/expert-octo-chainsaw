export interface IChoice {
    id: number;
    partnumber: string; // parts number
    description: string;
    list: number;
    cost: number;
}

export class SChoice implements IChoice {
    id: number;
    partnumber: string;
    description = '';
    list = 0;
    cost = 0;

    updated: Date;

    constructor(partnumber: string, description: string, list: number, cost: number) {
        this.id = -1;
        this.partnumber = partnumber;
        this.description = description;
        this.list = list;
        this.cost = cost;
        this.updated = new Date();
    }

    toVChoice(): VChoice {
        const v = new VChoice(this.partnumber, this.description, this.list, this.cost, false);
        v.id = this.id;
        return v;
    }
}


export class VChoice implements IChoice {
    static count: number = 0;

    id: number = -1;

    partnumber: string;
    partnumber_changed: boolean;
    partnumber_alarmed: boolean;

    description: string;
    description_changed: boolean;

    list: number;
    list_changed: boolean;

    cost: number;
    cost_changed: boolean;

    delete_scheduled: boolean;

    // updated_date: Date;

    constructor(partnumber: string, description: string, list: number, cost: number, countup: boolean = true) {
        if (countup) {
            this.id = VChoice.count;
            VChoice.count += 1;
        }

        this.partnumber = partnumber;
        this.description = description;
        this.list = list;
        this.cost = cost;

        this.partnumber_changed = false;
        this.partnumber_alarmed = false;
        this.description_changed = false;
        this.list_changed = false;
        this.cost_changed = false;
        this.delete_scheduled = false;

        // this.updated_date = new Date();
    }

    toSChoice(): SChoice {
        const s = new SChoice(this.partnumber, this.description, this.list, this.cost);
        s.id = this.id;
        return s;
    }
}