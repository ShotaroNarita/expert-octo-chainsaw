import Dexie, { Table } from "dexie";

const dbname = 'app'

export class Connector {
    static db: Dexie = new Dexie(dbname);
    static tables: { [key: string]: any } = {};
    static schemas: { [key: string]: string } = {};

    static use(tablename: string, schema: string) {
        this.schemas[tablename] = schema;
    }

    static lock() {
        console.log('version', this.db.verno);
        this.db.version(this.db.verno + 1).stores(this.schemas);

        for (let tablename in this.schemas) {
            this.tables[tablename] = this.db.table(tablename);
        }
    }
}