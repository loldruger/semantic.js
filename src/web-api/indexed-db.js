//@ts-check
/**
 * @enum {Number} Result
 * @property {Number} Success
 * @property {Number} Failed
 */
export const Result = Object.freeze({
    Success: 0,
    Failed: 1,
});

/**
 * @template TypeParam
 * @typedef {{
 *     between: {
 *         from: TypeParam,
 *         to: TypeParam
 *     }
 * }} BetweenClause
 */

/**
 * @typedef {{
 *     eq: String
 * }} EqClause
 */

/**
 * 
 * @template TypeParam
 * @typedef {{
 *     key?: {
 *         is: EqClause | BetweenClause<TypeParam>
 *     }
 * }} WhereClause<TypeParam>
 */

/**
 * @template T
 * @template E
 */
class DBResponse {
    /** @type {Result} */
    #status;

    /** @type {T?} */
    #data;

    /** @type {E?} */
    #error;

    /**
     * @private
     * @param {Result} status
     * @param {T?} data
     * @param {E?} error
     */
    constructor(status, data, error) {
        this.#status = status;
        this.#data = data;
        this.#error = error;
    }

    /**
     * @template Data
     * @param {Object} param
     * @param {Data} param.data
     * @return {DBResponse<Data, null>}
     */
    static ok({ data }) {
        return new DBResponse(Result.Success, data, null);
    }

    /**
     * @template E
     * @param {Object} param
     * @param {E} param.err
     * @return {DBResponse<null, E>}
     */
    static err({ err: error }) {
        return new DBResponse(Result.Failed, null, error);
    }

    /**
     * @return {T}
     */
    ok() {
        if (this.#status === Result.Failed) {
            throw new Error("Failed to build database");
        }

        return /** @type {T} */ (this.#data);
    }

    /**
     * @return {E}
     */
    err() {
        if (this.#status === Result.Success) {
            throw new Error("Failed to build database");
        }

        return /** @type {E} */ (this.#error);
    }
}

/**
 * @template {String} Name
 * @template {ConstructableTypeUnion} TypeInfo
 * @template {Boolean} [Nullable=Boolean]
 * @template {Boolean} [Indexed=Boolean]
 * @typedef {{
 *     name: Name,
 *     typeInfo: TypeInfo,
 *     constraint: {nullable?: Nullable|undefined, indexed?: Indexed|undefined}
 * }} Column<Name, ConstructableTypeUnion, Nullable, Indexed>
 */

/**
 * @template {Array<Column<String, ConstructableTypeUnion>>} ColumnStack
 * @template {String} ColumnName
 * @template {"primary"|"unique"|"foreign"} [Type="primary" | "unique"|"foreign"]
 * @typedef {{
 *     type: Type,
 *     format:
 *         ConstraintFormat<
 *             AsType<
 *                 Union.ToTuple<keyof {[K in ColumnStack[number] as K['name']]: any}>,
 *                 Array<String>
 *              >,
 *             ColumnName,
 *             Type
 *         >
 * }} Constraint<ColumnStack, ColumnName>
 */

/**
 * @template {Array<String>} ColumnNames
 * @template {String} ColumnName
 * @template {String} Type
 * @template {String} [RefTable=String]
 * @template {String} [RefColumn=String]
 * @typedef {Array.Contains<ColumnNames, ColumnName> extends true
 *     ? Type extends "primary"
 *         ? {column: ColumnName, autoIncrement: Boolean}
 *         : Type extends "unique"
 *             ? Array<ColumnName>
 *             : Type extends "foreign"
 *                 ? {
 *                     column: ColumnName,
 *                     ref: {
 *                         table: RefTable,
 *                         column: RefColumn
 *                     },
 *                     onDelete?: "CASCADE" | "RESTRICT" | "SET NULL" | "NO ACTION",
 *                     onUpdate?: "CASCADE" | "RESTRICT" | "SET NULL" | "NO ACTION"
 *                 }
 *                 : ErrorType<"Invalid constraint type">
 *     : ErrorType<"Column not found">
 * } ConstraintFormat<Array<String>, ColumnName, Type>
 */

/**
 * @template {String} TableName
 * @template {Array<Column<String, ConstructableTypeUnion>>} [ColumnStack=[]]
 * @template {Array<Constraint<ColumnStack, String>>} [ConstraintStack=[]]
 * @template {Array<Table<TableName, ColumnStack, ConstraintStack>>} [TableStack=[]]
 */
class Table {
    /** @type {Database<Array<Table<String, Array<Column<String, ConstructableTypeUnion>>, Array<Constraint<ColumnStack, String>>>>>} */
    #db;

    /** @type {TableName} */
    #name;

    /** @type {Array<Column<String, ConstructableTypeUnion>>} */
    #columns = [];

    /** @type {Array<Constraint<ColumnStack, String>>} */
    #constraints = [];

    /**
     * @param {Database<Array<Table<String, Array<Column<String, ConstructableTypeUnion>>, Array<Constraint<ColumnStack, String>>>>>} db
     * @param {TableName} name
     */
    constructor(db, name) {
        this.#db = db;
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    get columns() {
        return this.#columns;
    }

    get constraints() {
        return this.#constraints;
    }

    /**
     * @typedef {ColumnStack extends Array<infer T>
     *     ? T extends Column<infer N, any, any, any>
     *         ? N
     *         : never
     *     : never
     * } ColumnNameUnion
     */

    /**
     * @template {String} Name
     * @typedef {ColumnNameUnion extends never
     *     ? Name
     *     : Union.Contains<ColumnNameUnion, Name> extends true
     *         ? ErrorType<"Column already exists">
     *         : Name
     * } ColumnName<Name>
     */

    /**
     * @template {String} Name
     * @template {ConstructableTypeUnion} TypeInfo
     * @template {Boolean} Nullable
     * @template {Boolean} Indexed
     * @param {ColumnName<Name>} name
     * @param {TypeInfo} typeInfo
     * @param {Object} [param]
     * @param {Nullable} [param.nullable=false]
     * @param {Indexed} [param.indexed=false]
     * @return {Table<
     *     TableName,
     *     [...ColumnStack, Column<ColumnName<Name>, TypeInfo, Nullable, Indexed>],
     *     ConstraintStack,
     *     TableStack
     * >}
     */
    column(name, typeInfo, { nullable, indexed } = {}) {
        /** @type {Column<ColumnName<Name>, TypeInfo, Nullable, Indexed>} */
        const column = {
            name,
            typeInfo,
            constraint: { nullable, indexed },
        };

        this.#columns = [...this.#columns, column];
        return this;
    }

    /**
     * @template {AsType<Union.ToTuple<keyof {[K in ColumnStack[number] as K['name']]: any}>, Array<String>>} ColumnNames
     * @template {String} ColumnName
     * @template {"primary" | "unique" | "foreign"} Type
     * @template {String} RefTable
     * @template {String} RefColumn
     * @param {Type} type
     * @param {ConstraintFormat<
     *     ColumnNames,
     *     ColumnName,
     *     Type,
     *     RefTable,
     *     RefColumn
     * >} format
     * @return {Table<
     *     TableName,
     *     ColumnStack,
     *     [...ConstraintStack, Constraint<ColumnStack, ColumnName, Type>],
     *     TableStack
     * >}
     */
    constraint(type, format) {
        /** @type {Constraint<ColumnStack, ColumnName, Type>} */
        const constraint = {
            type,
            format,
        };

        this.#constraints = [
            ...this.#constraints,
            constraint
        ];

        return this;
    }

    /**
     * @return {Database<[...Array.Flatten<TableStack>, Table<TableName, ColumnStack, ConstraintStack>]>}
     */
    build() {
        return this.#db;
    }
}

/**
 * @template {Array<
 *     Table<
 *         String,
 *         Array<Column<String, ConstructableTypeUnion>>,
 *         Array<Constraint<Array<Column<String, ConstructableTypeUnion>>, String>>,
 *         Array<Table<String, Array<Column<String, ConstructableTypeUnion>>, Array<Constraint<Array<Column<String, ConstructableTypeUnion>>, String>>>>
 *     >
 * >} [TableStack=Array<
 *     Table<
 *         String,
 *         Array<Column<String, ConstructableTypeUnion>>,
 *         Array<Constraint<Array<Column<String, ConstructableTypeUnion>>, String>>,
 *         Array<Table<String, Array<Column<String, ConstructableTypeUnion>>, Array<Constraint<Array<Column<String, ConstructableTypeUnion>>, String>>>>
 *     >
 * >]
 */
export class Database {
    /** @type {IDBDatabase?} */
    #db = null;

    /** @type {String} */
    #name;

    /** @type {Number} */
    #version;

    /**
     * @type {Array<Table<String, Array<Column<String, ConstructableTypeUnion>>, Array<Constraint<Array<Column<String, ConstructableTypeUnion>>, String>>>>}
     * */
    #tables = [];

    /**
     * @private
     * @param {String} name
     * @param {Number} version
     */
    constructor(name, version) {
        this.#name = name;
        this.#version = version;
    }

    /**
     * @param {Object} param
     * @param {String} param.dbName
     * @param {Number} param.version
     * @return {Database<[]>}
     */
    static new({ dbName, version }) {
        if (version <= 0) {
            throw new Error("Invalid version number");
        }

        return new Database(dbName, version);
    }

    /**
     * @return {Promise<DBResponse<Database<TableStack>, Error?>>}
     */
    async build() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.#name, this.#version);

            /**
             * @param {Event} event 
             */
            request.onsuccess = (event) => {
                const target = /** @type {IDBOpenDBRequest} */ (event.target);
                this.#db = target.result;

                resolve(DBResponse.ok({
                    data: this
                }));
            };

            request.onerror = (event) => {
                const target = /** @type {IDBOpenDBRequest} */ (event.target);
                reject(DBResponse.err({
                    err: target.error
                }));
            };

            request.onupgradeneeded = (event) => {
                const target = /** @type {IDBOpenDBRequest} */ (event.target);

                target.onerror = (event) => {
                    const innerTarget = /** @type {IDBOpenDBRequest} */ (event.target);
                    reject(DBResponse.err({
                        err: innerTarget.error
                    }));
                };

                target.onsuccess = (event) => {
                    const innerTarget = /** @type {IDBOpenDBRequest} */ (event.target);
                    this.#db = innerTarget.result;

                    resolve(DBResponse.ok({
                        data: this
                    }));
                };

                for (const table of this.#tables) {
                    const primary = /** @type {Constraint<Array<Column<String, ConstructableTypeUnion>>, String, "primary">} */(
                        table.constraints.find(i => i.type === "primary")
                    );
                    const uniquesList = /** @type {Array<Constraint<Array<Column<String, ConstructableTypeUnion>>, String, "unique">>} */ (
                        table.constraints.filter(i => i.type === "unique")
                    );

                    const uniques = table.columns
                        .filter(i => uniquesList.some(j => j.format.includes(i.name)))
                        .map(i => i.name);

                    const objectStore = target.result.createObjectStore(table.name, {
                        keyPath: primary.format.column,
                        autoIncrement: primary.format.autoIncrement
                    });

                    for (const name of uniques) {
                        objectStore.createIndex(`${name}Index`, name, { unique: true });
                    }

                    for (const column of table.columns) {
                        if (column.constraint.indexed) {
                            objectStore.createIndex(`${column.name}Index`, column.name, { unique: column.constraint.indexed ?? false });
                        }
                    }
                }
            };
        });
    }

    /**
     * @typedef {TableStack extends Array<infer T>
     *     ? T extends Table<infer N, any, any, any>
     *         ? N
     *         : never
     *     : never
     * } TableNameUnion
     */

    /**
     * @template {String} Name
     * @typedef {TableNameUnion extends never
     *     ? Name
     *     : Union.Contains<TableNameUnion, Name> extends true
     *         ? ErrorType<"Table already exists">
     *         : Name
     * } TableName<Name>
     */

    /**
     * @template {String} Name
     * @param {TableName<Name>} tableName
     * @return {Table<TableName<Name>, [], [], TableStack>} 
     */
    table(tableName) {
        const table = new Table(this, tableName);
        this.#tables = [
            ...this.#tables,
            table
        ];

        return table;
    }

    /**
     * @template {String} ColName
     * @template {Array<Constraint<Array<Column<String, ConstructableTypeUnion>>, String>>} ConsStack
     * @typedef {ConsStack extends [infer F, ...infer R]
     *     ? (F extends Constraint<any, infer N, infer T>
     *         ? (N extends ColName
     *             ? (T extends "primary"
     *                 ? true
     *                 : IsPrimary<ColName, AsType<R, Array<Constraint<Array<Column<String, ConstructableTypeUnion>>, String>>>>
     *             )
     *             : IsPrimary<ColName, AsType<R, Array<Constraint<Array<Column<String, ConstructableTypeUnion>>, String>>>>)
     *         : false)
     *     : false
     * } IsPrimary<ColName, ConsStack>
     */

    /**
     * @template {TableNameUnion} TableName
     * @typedef {TableStack extends Array<infer T>
     *     ? T extends Table<TableName, infer TCols, infer TCons>
     *         ? {
     *             [C in TCols[number] as (
     *                 C extends Column<infer N, any, infer Nullable, any>
     *                     ? (
     *                         Nullable extends true
     *                             ? never
     *                             : IsPrimary<N, TCons> extends true ? never : N
     *                     )
     *                     : never
     *             )]:
     *                 C extends Column<any, infer TI, any, any>
     *                     ? InstanceType<AsType<TI, AbstConcreteType>>
     *                     : never;
     *         }
     *         : never
     *     : never
     * } RequiredColumns<T>
     */

    /**
     * @template {TableNameUnion} TableName
     * @typedef {TableStack extends Array<infer T>
     *     ? T extends Table<TableName, infer TCols, infer TCons>
     *         ? {
     *             [C in TCols[number] as (
     *                 C extends Column<infer N, any, true, any>
     *                     ? (IsPrimary<N, TCons> extends true ? never : N)
     *                     : never
     *           )]?:
     *               C extends Column<any, infer TI, any, any>
     *                   ? InstanceType<AsType<TI, AbstConcreteType>>
     *                   : never;
     *         }
     *         : never
     *     : never
     * } OptionalColumns<T>
     */

    /**
     * @template {TableNameUnion} TableName
     * @typedef {RequiredColumns<TableName> & OptionalColumns<TableName>} TableIntersection<TableName>
     */

    /**
     * @template {TableNameUnion} TableName
     * @typedef {TableStack extends Array<infer T>
     *     ? T extends Table<TableName, any, any, any>
     *         ? {[K in keyof TableIntersection<TableName>]: TableIntersection<TableName>[K]}
     *         : never
     *     : never
     * } TableColumns<TableName>
     */

    /**
     * @template {TableNameUnion} Name
     * @template {Exact<TableColumns<Name>, Data>} Data
     * @param {Object} param
     * @param {Name} param.tableName
     * @param {Data} param.data
     * @return {Promise<DBResponse<Database<TableStack>, Error?>>}
     */
    async insert({ tableName, data }) {
        return new Promise((resolve, reject) => {
            if (!this.#db) {
                reject(DBResponse.err({
                    err: new Error("Database not initialized")
                }));

                return;
            }

            const transaction = this.#db.transaction([tableName], "readwrite");
            const objectStore = transaction.objectStore(tableName);
            const request = objectStore.add(data);

            request.onsuccess = () => {
                resolve(DBResponse.ok({
                    data: this
                }));
            };

            request.onerror = () => {
                reject(DBResponse.err({
                    err: request.error
                }));
            };
        });
    }

    /**
     * @param {Object} param
     * @param {TableNameUnion} param.tableName
     * @param {WhereClause<String>} param.where
     * @param {Number?} param.limit
     * @return {Promise<DBResponse<Array<any>?, Error?>>}
     */
    async select({ tableName, where, limit }) {
        return new Promise((resolve, reject) => {
            const transaction = /** @type {IDBDatabase} */ (this.#db).transaction([tableName], "readonly");
            const objectStore = transaction.objectStore(tableName);

            const key = where.key;

            if (key?.is) {
                if ("eq" in key.is) {
                    const request = objectStore.get(key.is.eq);

                    request.onsuccess = () => {
                        resolve(DBResponse.ok({
                            data: request.result
                        }));
                    };

                    request.onerror = () => {
                        reject(DBResponse.err({
                            err: request.error
                        }));
                    };

                } else if ("between" in key.is) {
                    const request = objectStore.openCursor(IDBKeyRange.bound(key.is.between.from, key.is.between.to));
                    let count = 0;

                    request.onsuccess = (event) => {
                        const target = /** @type {IDBRequest<IDBCursorWithValue>} */ (event.target);
                        const result = /** @type {Array<any>}*/ ([]);
                        const cursor = target.result;

                        if (!cursor) {
                            resolve(DBResponse.ok({ data: result }));
                            return;
                        }

                        if (limit && count >= limit) {
                            resolve(DBResponse.ok({ data: result }));
                            return;
                        }

                        result.push(cursor.value);
                        count++;

                        // Skip to next record - more efficient than continue()
                        cursor.advance(1);
                    };

                    request.onerror = () => {
                        reject(DBResponse.err({
                            err: request.error
                        }));
                    };
                } else {
                    reject(DBResponse.err({
                        err: new Error("Invalid where clause")
                    }));
                }
            }
        });
    }

    /**
     * @param {Object} param
     * @param {TableNameUnion} param.tableName
     * @param {Object} param.data
     * @param {WhereClause<String>} param.where
     * @param {Boolean} param.isReturning
     * @return {Promise<DBResponse<Array<any>?, Error?>>}
     */
    async update({ tableName, data, where, isReturning }) {
        return new Promise((resolve, reject) => {
            const transaction = /** @type {IDBDatabase} */ (this.#db)
                .transaction([tableName], "readwrite");
            const objectStore = transaction.objectStore(tableName);
            const key = where.key;

            if (key?.is) {
                if ("eq" in key.is) {
                    const request = objectStore.get(key.is.eq);

                    request.onsuccess = () => {
                        const result = request.result;

                        if (result) {
                            Object.assign(result, data);
                            objectStore.put(result);

                            if (isReturning) {
                                resolve(DBResponse.ok({ data: result }));
                            } else {
                                resolve(DBResponse.ok({ data: null }));
                            }
                        } else {
                            reject(DBResponse.err({
                                err: new Error("Record not found")
                            }));
                        }
                    };

                    request.onerror = () => {
                        reject(DBResponse.err({
                            err: request.error
                        }));
                    };

                } else if ("between" in key.is) {
                    const request = objectStore.openCursor(IDBKeyRange.bound(key.is.between.from, key.is.between.to));

                    request.onsuccess = (event) => {
                        const target = /** @type {IDBRequest<IDBCursorWithValue>} */ (event.target);
                        const cursor = target.result;

                        if (cursor) {
                            const result = cursor.value;
                            Object.assign(result, data);
                            cursor.update(result);
                            cursor.continue();
                        } else {
                            resolve(DBResponse.ok({ data: null }));
                        }
                    };

                    request.onerror = () => {
                        reject(DBResponse.err({ err: request.error }));
                    };
                } else {
                    reject(DBResponse.err({ err: new Error("Invalid where clause") }));
                }
            }
        });
    }

    /**
     * @param {Object} param
     * @param {TableNameUnion} param.tableName 
     * @param {WhereClause<String>=} param.where
     * @return {Promise<DBResponse<null, Error?>>}
     */
    async delete({ tableName, where }) {
        return new Promise((resolve, reject) => {
            const transaction = /** @type {IDBDatabase} */ (this.#db).transaction([tableName], "readwrite");
            const objectStore = transaction.objectStore(tableName);
            const condition = where?.key;

            if (condition) {
                if ("eq" in condition.is) {
                    const request = objectStore.delete(condition.is.eq);
                    request.onsuccess = () => {
                        resolve(DBResponse.ok({
                            data: null
                        }));
                    };

                    request.onerror = () => {
                        reject(DBResponse.err({
                            err: request.error
                        }));
                    };

                } else if ("between" in condition.is) {
                    const request = objectStore.delete(IDBKeyRange.bound(condition.is.between.from, condition.is.between.to));

                    request.onsuccess = () => {
                        resolve(DBResponse.ok({
                            data: null
                        }));
                    };

                    request.onerror = () => {
                        reject(DBResponse.err({
                            err: request.error
                        }));
                    };
                } else {
                    reject(DBResponse.err({
                        err: new Error("Invalid where clause")
                    }));
                }
            } else {
                const request = objectStore.clear();

                request.onsuccess = () => {
                    resolve(DBResponse.ok({
                        data: null
                    }));
                };

                request.onerror = () => {
                    reject(DBResponse.err({
                        err: request.error
                    }));
                }
            }
        });
    }

    async clearDb() {
        return new Promise((resolve, reject) => {
            const transaction = /** @type {IDBDatabase} */ (this.#db)
                .transaction(/** @type {IDBDatabase} */(this.#db).objectStoreNames, "readwrite");
            transaction.onerror = (event) => {
                reject({
                    result: Result.Failed,
                    data: event
                });
            };

            transaction.oncomplete = () => {
                resolve({
                    result: Result.Success,
                    data: null
                });
            };

            for (const store of /** @type {IDBDatabase} */ (this.#db).objectStoreNames) {
                transaction.objectStore(store).clear();
            }
        });
    }
}

Object.setPrototypeOf(DBResponse, null);
Object.setPrototypeOf(DBResponse.prototype, null);
Object.setPrototypeOf(Database, null);
Object.setPrototypeOf(Database.prototype, null);
Object.setPrototypeOf(Table, null);
Object.setPrototypeOf(Table.prototype, null);
