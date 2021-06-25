import Dexie from "dexie";

export class Connector<T> extends Dexie {
    body: Dexie.Table<T, number>;
    constructor(dbname: string, tablename: string, columns: string) {
        super(dbname);
        this.version(1).stores({
            [tablename]: columns
        });
        this.body = this.table(tablename);
        // this.body.mapToClass(T);
    }
}