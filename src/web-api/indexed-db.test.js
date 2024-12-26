//@ts-check

import { Database } from '../lib.js';

//@ts-ignore
const test0 = await (async () => {
    const db = (await Database.new({ dbName: "Estimates", version: 1 })
        .table("TableName")
        .column("id", Number, { indexed: true })
        .column("name", String, { nullable: true })
        .column("createdAt", Date)
        .constraint("primary", { name: "id", autoIncrement: true })
        .constraint("unique", ["name"])
        .build()
        .build())
        .ok();

    await db.insert({
        tableName: "TableName",
        data: { name: 0, createdAt2: new Date() }
    })

    // await db.insert({
    //     tableName: "TableName2",
    //     data: { id: 0, name: "test2", nice: "asdf" }
    // })
})();


