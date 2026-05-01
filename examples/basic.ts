/**
 * Run this example:
 *
 * ```bash
 * $ npx tsx ./examples/basic.ts
 * ```
 */

import { stringifyError } from '../src/index.js';
import separator from './_separator.js';

const e1 = new Error('e1 error message');

const result1 = stringifyError(e1);

separator('Simple Error object');
console.log(result1);
separator('(stringified)');
console.log(JSON.stringify(result1));

const e2 = new Error('e2 error message', { cause: e1 });

const result2 = stringifyError(e2);

separator('Simple Error object with cause');
console.log(result2);
separator('(stringified)');
console.log(JSON.stringify(result2));

const e3 = new Error('e3 error message', { cause: e2 });

const result3 = stringifyError(e3);

separator('Simple Error object with multiple causes');
console.log(result3);
separator('(stringified)');
console.log(JSON.stringify(result3));
