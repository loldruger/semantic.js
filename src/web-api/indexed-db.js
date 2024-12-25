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
 * @template {String} ColumnName
 * @template {"primary"|"unique"} [Type="primary" | "unique"]
 * @typedef {{type: Type, format: ConstraintFormat<ColumnName, Type>}} Constraint<ColumnName>
 */

/**
 * @template {String} ColumnName
 * @template {String} Type
 * @typedef {Type extends "primary"
 *     ? {name: ColumnName, autoIncrement: Boolean}
 *     : Type extends "unique"
 *         ? Array<String>
 *         : never
 * } ConstraintFormat<ColumnName, Type>
 */

/**
 * @template {String} TableName
 * @template {Array<Column<String, ConstructableTypeUnion>>} [ColumnStack=[]]
 * @template {Array<Constraint<String>>} [ConstraintStack=[]]
 */
class Table {
    /** @type {Database} */
    #db;

    /** @type {TableName} */
    #name;

    /** @type {Array<Column<String, ConstructableTypeUnion>>} */
    #columns = [];

    /** @type {Array<Constraint<String>>} */
    #constraints = [];

    /**
     * @param {Database} db
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
     * @template {String} Name
     * @template {ConstructableTypeUnion} TypeInfo
     * @template {Boolean} Nullable
     * @template {Boolean} Indexed
     * @param {Name} name
     * @param {TypeInfo} typeInfo
     * @param {Object} [param]
     * @param {Nullable} [param.nullable=false]
     * @param {Indexed} [param.indexed=false]
     * @return {Table<
     *     TableName,
     *     [...ColumnStack, Column<Name, TypeInfo>],
     *     ConstraintStack
     * >}
     */
    column(name, typeInfo, { nullable, indexed } = {}) {
        /** @type {Column<Name, TypeInfo, Nullable, Indexed>} */
        const column = {
            name,
            typeInfo,
            constraint: { nullable, indexed },
        };

        this.#columns = {
            ...this.#columns,
            [name]: column
        };
        return this;
    }

    /**
     * @template {String} ColumnName
     * @template {"primary" | "unique"} Type
     * @param {Type} type
     * @param {ConstraintFormat<ColumnName, Type>} format
     * @return {Table<
     *     TableName,
     *     ColumnStack,
     *     [...ConstraintStack, Array<Constraint<ColumnName>>],
     * >}
     */
    constraint(type, format) {
        /** @type {Constraint<String, Type>} */
        const constraint = {
            type,
            format,
        };

        this.#constraints = [...this.#constraints, constraint];

        return this;
    }

    /**
     * @return {Database<this>}
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
 *         Array<Constraint<String>>
 *     >
 * >} [TableStack=[]]
 */
export class Database {
    /** @type {IDBDatabase?} */
    #db = null;

    /** @type {String} */
    #name;

    /** @type {Number} */
    #version;

    /**  @type {TableStack} */
    #tables = /** @type {TableStack} */ (/** @type {unknown} */ ([]));

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
     * @return {Database}
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
                    const primary = /** @type {Constraint<String, "primary">} */(
                        table.constraints.find(i => i.type === "primary")
                    );
                    const uniquesList = /** @type {Array<Constraint<String, "unique">>} */ (
                        table.constraints.filter(i => i.type === "unique")
                    );

                    const uniques = table.columns
                        .filter(i => uniquesList.some(j => j.format.includes(i.name)))
                        .map(i => i.name);

                    const objectStore = target.result.createObjectStore(table.name, {
                        keyPath: primary.format.name,
                        autoIncrement: primary.format.autoIncrement
                    });

                    for (const name of uniques) {
                        objectStore.createIndex(`${name}Index`, name, { unique: true });
                    }

                    for (const key in table.columns) {
                        const column = table.columns[key];
                        objectStore.createIndex(key, key, { unique: column.constraint.indexed ?? false });
                    }
                }
            };
        });
    }

    /**
     * @template {String} Name
     * @param {Name} tableName
     * @return {Table<Name, [], []>}
     */
    table(tableName) {
        const table = new Table(this, tableName);
        this.#tables = {
            ...this.#tables,
            [tableName]: table
        };

        return table;
    }
    /**
     * @template T
     * @typedef {T extends Array<Column<infer Name, infer TypeInfo, any, any>>
    *   ? { [K in T[number] as K['name']]: InstanceType<AsType<K['typeInfo'], AbstConcreteType>> }
    *   : never
    * } ColumnsToObject
    */
    /**
     * @template {String} TableName
     * @typedef {TableStack extends Table<TableName, infer Columns, infer Constraints>
     *    ? ColumnsToObject<Columns>
     *    : never
     * } TableColumns<TableName>
     */

    /**
     * @template {String} Name
     * @template {TableColumns<Name>} Data
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
     * @param {String} param.tableName
     * @param {WhereClause<String>} param.where
     * @param {Number} param.limit
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

                    request.onsuccess = (event) => {
                        const target = /** @type {IDBRequest<IDBCursorWithValue>} */ (event.target);
                        const cursor = target.result;
                        const result = /** @type {Array<any>}*/ ([]);

                        if (cursor) {
                            result.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(DBResponse.ok({
                                data: result
                            }));
                        }
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
     * @param {String} param.tableName
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
     * @param {String} param.tableName 
     * @param {WhereClause<String>} param.where 
     * @return {Promise<DBResponse<null, Error?>>}
     */
    async delete({ tableName, where }) {
        return new Promise((resolve, reject) => {
            const transaction = /** @type {IDBDatabase} */ (this.#db).transaction([tableName], "readwrite");
            const objectStore = transaction.objectStore(tableName);
            const key = where.key;

            if (key?.is) {
                if ("eq" in key.is) {
                    const request = objectStore.delete(key.is.eq);

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

                } else if ("between" in key.is) {
                    const request = objectStore.openCursor(IDBKeyRange.bound(key.is.between.from, key.is.between.to));

                    request.onsuccess = (event) => {
                        const target = /** @type {IDBRequest<IDBCursorWithValue>} */ (event.target);
                        const cursor = target.result;

                        if (cursor) {
                            cursor.delete();
                            cursor.continue();
                        } else {
                            resolve(DBResponse.ok({
                                data: null
                            }));
                        }
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
