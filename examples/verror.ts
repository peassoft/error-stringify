/**
 * Run this example:
 *
 * ```bash
 * $ npx tsx ./examples/verror.ts
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

const e2 = new VError(
  {
    name: 'CustomVError',
    cause: e1,
    info: {
      p1: 'foo',
      p2: 123,
      p3: {
        p31: true,
      },
    },
  },
  'verror message',
);

const result = stringifyError(e2);

separator('VError');
console.log(result);
separator('(stringified)');
console.log(JSON.stringify(result));
