//@ts-check

/**
 * @template {number} T
 * @template {Array<unknown>} [Arr=[]]
 * @typedef {Arr['length'] extends T
*     ? [...Arr, unknown]['length']
*     : Math.IncrementOf<T, [...Arr, unknown]>
* } Math.IncrementOf<T>
*/

/**
* @template {number} T
* @template {Array<unknown>} [Arr=[]]
* @typedef {Arr['length'] extends T
*     ? (Arr extends [...infer F, unknown] ? F['length'] : undefined)
*     : Math.DecrementOf<T, [...Arr, unknown]>
* } Math.DecrementOf<T>
*/

/**
 * @typedef {0|1|2|3|4|5|6|7|8|9} UnionOfNumbers
 */

/**
 * @typedef {Math.IncrementOf<1>} ASDF
 */

/**
 * @typedef {Math.DecrementOf<0>} ASDF2
 */

// /**
//  * @typedef {ASDF<[1,1,1,1]>} A
//  */