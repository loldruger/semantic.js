// @ts-check

/**
 * @template T
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
	match(pattern) {
		throw new Error('Method not implemented.');
	}
};