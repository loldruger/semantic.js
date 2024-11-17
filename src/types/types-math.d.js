//@ts-check

/**
 * @template {number} T
 * @template {Array<unknown>} [Arr=[]]
 * @typedef {Arr['length'] extends T
*     ? [...Arr, unknown]['length']
*     : IncrementOf<T, [...Arr, unknown]>
* } IncrementOf<T>
*/

/**
* @template {number} T
* @template {Array<unknown>} [Arr=[]]
* @typedef {Arr['length'] extends T
*     ? (Arr extends [...infer F, unknown] ? F['length'] : undefined)
*     : DecrementOf<T, [...Arr, unknown]>
* } DecrementOf<T>
*/

/**
 * @typedef {0|1|2|3|4|5|6|7|8|9} UnionOfNumbers
 */

/**
 * @template {[UnionOfNumbers]} T
 * @typedef {T} ASDF
 */

// /**
//  * @typedef {ASDF<[1,1,1,1]>} A
//  */