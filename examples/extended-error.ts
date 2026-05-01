/**
 * Run this example:
 *
 * ```bash
 * $ npx tsx ./examples/extended-error.ts
 * ```
 */

import { stringifyError } from '../src/index.js';
import separator from './_separator.js';

const e1 = new Error('e1 error message');

Object.defineProperty(e1, 'boolean', {
  value: true,
  enumerable: true,
});

Object.defineProperty(e1, 'number', {
  value: 1.25,
  enumerable: true,
});

Object.defineProperty(e1, 'bigint', {
  value: 5n,
  enumerable: true,
});

Object.defineProperty(e1, 'string', {
  value: 'foo',
  enumerable: true,
});

Object.defineProperty(e1, 'null', {
  value: null,
  enumerable: true,
});

Object.defineProperty(e1, 'undefined', {
  value: undefined,
  enumerable: true,
});

Object.defineProperty(e1, 'obj', {
  value: {
    a: 12345,
    b: {
      c: 'bar',
      d: null,
    },
  },
  enumerable: true,
});

const result1 = stringifyError(e1);

separator('Error object with additional fields');
console.log(result1);
separator('(stringified)');
console.log(JSON.stringify(result1));

const e2 = new Error('e2 error message', { cause: e1 });

Object.defineProperty(e2, 'foo2', {
  value: 'bar2',
  enumerable: true,
});

Object.defineProperty(e2, 'baz2', {
  value: 2,
  enumerable: true,
});

const result2 = stringifyError(e2);

separator('Error object with additional fields and cause');
console.log(result2);
separator('(stringified)');
console.log(JSON.stringify(result2));
