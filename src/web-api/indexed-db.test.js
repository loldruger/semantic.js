//@ts-check

import { Database } from '../lib.js';

//@ts-ignore
const test0 = (async () => {
    const db = (await Database.new({ dbName: "Estimates", version: 1 })
        .table("TableName")
        .column("id", Number, { indexed: true })
        .column("name", String)
        .column("createdAt2", Date)
        .constraint("primary", { name: "id", autoIncrement: true })
        .constraint("unique", ["name"])
        .build()
        .build())
        .ok();

    console.log("Database: ", db);
    db.insert({
        tableName: "TableName",
        data: { id: 0, name: "test", createdAt: new Date() }
    })

    // await db.insert({
    //     tableName: "TableName2",
    //     data: { id: 0, name: "test2", nice: "asdf" }
    // })
})();


