// @ts-check

/**
 * @template T
 * @interface Cloneable<T>
 */
export class Cloneable {
	/**
	 * @private
	 */
	constructor() { }

	/**
	 * @returns {T}
	 */
	clone() {
		throw new Error('Method not implemented.');
	}
};
