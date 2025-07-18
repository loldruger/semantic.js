/**
 * @template T, U
 * @typedef {U extends T
 *     ? true
 *     : U extends unknown
 *         ? T extends U
 *             ? true
 *             : false
 *         : never
 * } Union.Contains<T, U>
 */

/**
 * @template U
 * @typedef {(
 *     U extends unknown ? (k: U) => void : never
 * ) extends (k: infer I) => void
 *     ? I
 *     : never
 * } Union.ToIntersection<U>
 */

/**
 * @template U
 * @typedef {Union.ToIntersection<
 *    U extends unknown ? (k: U) => void : never
 * > extends (k: infer I) => void
 *    ? [...Union.ToTuple<Exclude<U, I>>, I]
 *    : []
 * } Union.ToTuple<U>
 */