/**
 * @template {Array<unknown>} T
 * @typedef {T extends [infer First, ...infer Rest]
 *     ? First extends Rest[number]
 *         ? true
 *         : Array.HasDuplicatedItem<Rest> 
 *     : false
 * } Array.HasDuplicatedItem<T>
 */

/**
 * @template {Array<ItemType>} Target
 * @template {ItemType} Item
 * @template [ItemType=unknown]
 * @typedef {[...Target, Item]} Array.Push<Target, Item>
 */

/**
 * @template {Array<unknown>} Container
 * @template Item
 * @typedef {Container extends [infer First, ...infer Rest]
 *     ? First extends Item 
 *         ? true 
 *         : Array.Contains<Rest, Item>
 *     : false
 * } Array.Contains<Container, Item>
 */

/**
 * @template {Array<unknown>} A
 * @typedef {A extends [infer First, ...infer Rest]
 *   ? First extends Array<unknown> ? [...Array.Flatten<First>, ...Array.Flatten<Rest>] : [First, ...Array.Flatten<Rest>]
 *   : []
 * } Array.Flatten<A>
 */

/**
 * @template {Array<unknown>} T
 * @typedef {Union.ToIntersection<T[number]>} Array.ToUnion<T>
 */

/**
 * @template {ReadonlyArray<unknown>} T
 * @typedef {T extends []
 *     ? []
 *     : T extends [infer Head, ...infer Tail]
 *         ? [Type.ToConstructorType<Head>, ...Array.ToTupleType<Tail extends ReadonlyArray<unknown>
 *             ? Tail
 *             : []>
 *         ] : []
 * } Array.ToTupleType<T>
 */