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
	 * @param {Object} pattern
	 * @returns {Boolean}
	 */
	match(pattern) { return true; }
};