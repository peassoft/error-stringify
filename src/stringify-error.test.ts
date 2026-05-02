import { test, expect } from 'vitest';
import VError from '@peassoft/verror';
import self from './stringify-error.js';

test('ordinary Error', () => {
  const e1 = new Error('e1 error message');
  Object.defineProperty(e1, 'prop1', {
    value: 'foo',
    enumerable: true,
  });
  Object.defineProperty(e1, 'prop2', {
    value: undefined,
    enumerable: true,
  });
  const e2 = new Error('e2 error message', { cause: e1 });

  const result = self(e2);

  expect(typeof result).toBe('string');
  expect(result.indexOf('prop2'), 'should drop props with undefined value').toBe(-1);
});

test('VError', () => {
  const e1 = new Error('e1 error message');
  const e2 = new VError(
    {
      name: 'CustomVError',
      cause: e1,
      info: {
        p1: 'foo',
        p2: 123,
        p3: {
          p31: true,
          p32: undefined,
        },
      },
    },
    'verror message',
  );

  const result = self(e2);

  expect(typeof result).toBe('string');
  expect(result.indexOf('p32'), 'should drop props with undefined value').toBe(-1);
});

test('AggregateError', () => {
  const e1 = new Error('e1 error message');
  const e2 = new Error('e2 error message', { cause: e1 });
  const e3 = new Error('e3 error message');
  const e4 = new Error('e4 error message');
  const err = new AggregateError(
    [e2, e3],
    'aggregate error mesage',
    { cause: e4 },
  );

  const result = self(err);

  expect(typeof result).toBe('string');
  expect(result.indexOf('[error[0]]'), 'should include first error').toBeGreaterThan(-1);
  expect(result.indexOf('[error[1]]'), 'should include second error').toBeGreaterThan(-1);
});

test('DOMException', () => {
  const e = new DOMException('error message', 'CustomName');

  const result = self(e);

  expect(typeof result).toBe('string');
  expect(result.indexOf('CustomName'), 'should include error name').toBeGreaterThan(-1);
});
