// @ts-check

/**
 * @interface Matchable
 */
export class Matchable {
	/**
	 * @private
	 */
	constructor() { }

	/**
     * @returns {Boolean}
     * @param {Object} pattern
	 */
	match(pattern) {
		throw new Error("Method not implemented.");
	}
};