/**
 * Stringify an Error or DOMException object
 *
 * @public
 */
export default function stringifyError(err: Error | DOMException): string {
  return stringify(err, '');
}

function stringify(
  err: Error | DOMException,
  prefix: string,
  indentLevel: number = 0,
): string {
  let result: string;

  // Typescript is formally right as tne `stack` property is non-standard.
  // However, this property is de facto implemented by all major JavaScript engines,
  // and the JavaScript standards committee is looking to standardize it.
  // See [https://devdocs.io/javascript/global_objects/error/stack].
  if (err.stack) {
    result = err.stack;
  } else {
    result = `${err.name}: ${err.message}`;
  }

  const rows = result.split('\n');
  const secondRow = rows[1];
  const spaces = secondRow?.match(/^(?<spaces>\s*)/)?.groups?.['spaces'] || ' '.repeat(4);

  if (secondRow) {
    result = indent(spaces, indentLevel) +
      (prefix ? `${prefix} ` : '') +
      (rows[0] || '');

    for (let i = 1; i < spaces.length; i++) {
      result += `\n${indent(spaces, indentLevel)}${rows[i]}`;
    }
  }

  // TODO
  // We would be better off using `Error.isError()` here as it has some benefits over
  // `instanceof Error` See: [https://devdocs.io/javascript/global_objects/error/iserror].
  // But as of 2026-04-30, `Error.isError()` is not supported by all JS engines.
  if (err.cause && err.cause instanceof Error) {
    result += `\n${stringify(err.cause, '[cause]', indentLevel + 1)}`;
  }

  if (err instanceof AggregateError) {
    for (const [idx, e] of err.errors.entries()) {
      if (e instanceof Error) {
        result += `\n${stringify(e, `[error[${idx}]]`, indentLevel + 1)}`;
      }
    }
  }

  result += stringifyObject(err, spaces, indentLevel);

  return result;
}

function indent(chars: string, indentLevel: number): string {
  return chars.repeat(indentLevel);
}

function stringifyObject(obj: object, spaces: string, indentLevel: number): string {
  let result = '';

  for (const [key, value] of Object.entries(obj)) {
    if (
      key === 'cause' ||
      key === 'name'
    ) continue;

    switch (typeof value) {
      case 'boolean':
      case 'number':
      case 'bigint':
      case 'string':
        result += `\n${indent(spaces, indentLevel)}${key}: ${value}`;
        break;
      case 'object': {
        if (value === null) {
          result += `\n${indent(spaces, indentLevel)}${key}: ${value}`;
        } else {
          result += `\n${indent(spaces, indentLevel)}${key}: {`;
          // ESLint does not recognize this kind of type narrowing (TS does).
          /* eslint-disable-next-line  @typescript-eslint/no-unsafe-argument */
          result += stringifyObject(value, spaces, indentLevel + 1);
          result += `\n${indent(spaces, indentLevel)}}`;
        }
      }
    }
  }

  return result;
}
