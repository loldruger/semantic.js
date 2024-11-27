/**
 * @template P
 * @typedef {Match<P, [
 *     (p: 'String') => 'String',
 *     (p: 'Number') => 'Number',
 *     (p: 'Boolean', when: false) => 'Boolean',
 *     (when: true) => 'Default2',
 *     () => 'Default'
 * ]>} TestMatch<P>
 */

/**
 * @typedef {TestMatch<'String1'>} TestMatchString
 */