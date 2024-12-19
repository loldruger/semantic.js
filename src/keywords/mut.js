//@ts-check

/**
 * @template {ConstructableTypeUnion} T
 * @param {T} x
 * @returns {Mut<T>}
 */
export const mut = (x) => { return { mut: x } };

/**
 * @template {ConstructableTypeUnion} T
 * @param {T} x 
 * @returns {Imut<T>}
 */
export const imut = (x) => { return { imut: x } };