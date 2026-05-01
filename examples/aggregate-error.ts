/**
 * Run this example:
 *
 * ```bash
 * $ npx tsx ./examples/aggregate-error.ts
 * ```
 */

import { stringifyError } from '../src/index.js';
import separator from './_separator.js';
import VError from '@peassoft/verror';

const e1 = new Error('e1 error message');

Object.defineProperty(e1, 'string', {
  value: 'foo',
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

const e2 = new Error('e2 error message', { cause: e1 });
const e3 = new Error('e3 error message');
const e4 = new Error('e4 error message');

const err = new AggregateError(
  [e2, e3],
  'aggregate error mesage',
  { cause: e4 },
);

const result = stringifyError(err);

separator('AggregateError');
console.log(result);
separator('(stringified)');
console.log(JSON.stringify(result));

const ve = new VError(
  {
    name: 'CustomVError',
    cause: err,
  },
  'verror message',
);

const result1 = stringifyError(ve);

separator('VError wrapping AggregateError');
console.log(result1);
separator('(stringified)');
console.log(JSON.stringify(result1));
