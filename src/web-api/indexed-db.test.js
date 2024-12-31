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
        .table("TableName1")
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
        data: { name: "table1", createdAt: new Date() }
    })

})();


