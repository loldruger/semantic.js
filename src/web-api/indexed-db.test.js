//@ts-check

import { Database } from '../lib.js';

//@ts-ignore
const test0 = await (async () => {
    const db = Database.new({ dbName: "Estimates", version: 1 })
        .table("TableName")
        .column("id", Number, { indexed: true })
        .column("name", String)
        .column("createdAt", Date)
        .constraint("primary", { name: "id", autoIncrement: true })
        .constraint("unique", ["name"])
        .build()

        .table("TableName2")
        .column("id", Number, { indexed: true })
        .column("name2", String)
        .column("nice", String)
        .constraint("primary", { name: "id", autoIncrement: true })
        .constraint("unique", ["name2"])
        .build()

    console.log("Database: ", db);
    // await db.insert({
    //     tableName: "TableName",
    //     data: { id: 0, name: "test", createdAt: new Date() }
    // })

    // await db.insert({
    //     tableName: "TableName2",
    //     data: { id: 0, name: "test2", nice: "asdf" }
    // })
})();


