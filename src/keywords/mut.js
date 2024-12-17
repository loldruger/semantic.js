//@ts-check

/**
 * @param {ConstructableTypeUnion} T
 * @returns {Mut<InstanceType<T>>}
 */
export const Mut = (T) => T;