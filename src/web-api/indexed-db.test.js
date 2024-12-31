//@ts-check

import { Database } from '../lib.js';

//@ts-ignore
const test0 = await (async () => {
    const db = (await Database.new({ dbName: "Estimates", version: 1 })
        .table("Table1")
        .column("id", Number, { indexed: true })
        .column("name", String, { nullable: true })
        .column("createdAt", Date)
        .constraint("primary", { column: "id", autoIncrement: true })
        .constraint("unique", ["name"])
        .build()
        .table("Table2")
        .column("id", Number, { indexed: true })
        .column("name", String, { nullable: true })
        .column("table1Id", Number)
        .column("id1", Date)
        .constraint("primary", { column: "id", autoIncrement: true })
        .constraint("foreign", { column: "table1Id", ref: { table: "Table1", column: "id" }, onDelete: "CASCADE" })
        .constraint("unique", ["name"])
        .build()
        .build())
        .ok();

    await db.insert({
        tableName: "Table1",
        data: { name: "table1", createdAt: new Date() }
    })

    await db.delete({
        tableName: "Table1"
    })
})();


