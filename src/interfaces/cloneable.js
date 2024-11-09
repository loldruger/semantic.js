// @ts-check

/**
 * @interface Cloneable
 */
export class Cloneable {
	/**
	 * @private
	 */
	constructor() { }

	/**
	 * @returns {ThisType}
	 */
	clone() { return this; }
};
