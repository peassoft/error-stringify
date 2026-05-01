/**
 * Run this example:
 *
 * ```bash
 * $ npx tsx ./examples/dom-exception.ts
 * ```
 */

import { stringifyError } from '../src/index.js';
import separator from './_separator.js';

const e1 = new DOMException('error message');

const result1 = stringifyError(e1);

separator('DOMException');
console.log(result1);
separator('(stringified)');
console.log(JSON.stringify(result1));

const e2 = new DOMException('error message', 'CustomName');

const result2 = stringifyError(e2);

separator('DOMException with name');
console.log(result2);
separator('(stringified)');
console.log(JSON.stringify(result2));
