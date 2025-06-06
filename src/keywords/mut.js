//@ts-check

/**
 * @template {unknown} T
 * @param {T} x
 * @returns {Mut<T>}
 */
export const mut = (x) => { return { mut: x } };

/**
 * @template {unknown} T
 * @param {T} x 
 * @returns {IMut<T>}
 */
export const imut = (x) => { return { imut: x } };