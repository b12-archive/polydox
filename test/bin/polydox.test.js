const {resolve} = require('path');
const {execFile} = require('child_process');
const {isArray} = Array;

const tape = require('tape-catch');
const {test, plus, curry} = require('1-liners');
const spawn = require('tape-spawn');

const title = curry(plus)('The CLI program:  ');
const polydox = resolve(__dirname, '../../module/bin/polydox.js');
const polydoxCommand = curry(execFile)(polydox);

tape(title('Prints usage'), (is) => {
  is.plan(6);

  polydoxCommand([], (error, _, stderr) => {
    is.equal(error && error.code, 1,
      '`polydox` fails…'
    );

    is.ok(
      test(stderr, /^usage:/i),
      '…and prints usage to stderr'
    );
  });

  polydoxCommand(['-h'], (error, stdout) => {
    is.equal(error, null,
      '`polydox -h` succeeds…'
    );

    is.ok(
      test(stdout, /^usage:/i),
      '…and prints usage'
    );
  });

  polydoxCommand(['--help'], (error, stdout) => {
    is.equal(error, null,
      '`polydox --help` succeeds…'
    );

    is.ok(
      test(stdout, /SYNOPSIS/),
      '…and prints manpage-like help'
    );
  });
});

const cwd = resolve(__dirname, '../mock-cwd');

const validJson = (output) => {
  try {JSON.parse(output);}
  catch (e) {
    if (e instanceof SyntaxError) return false;
    else throw e;
  }

  return true;
};

tape(title('Works with a single file'), (is) => {
  const run = spawn(is, `${polydox} a.js`, {cwd});

  run.succeeds(
    'succeeds'
  );

  run.stdout.match(
    validJson,
    'outputs JSON'
  );

  run.stdout.match(
    (output) => isArray(JSON.parse(output)),
    'outputs a JSON array'
  );

  run.stdout.match(
    (output) => JSON.parse(output).length === 1,
    'with one element (for one docblock)'
  );

  run.stdout.match(
    (output) => JSON.parse(output)[0].sourceFile === 'a.js',
    'with the file’s source in `sourceFile`'
  );

  run.stdout.match(
    (output) => JSON.parse(output)[0].tags[0].type === 'example',
    'with correct tags'
  );

  run.stdout.match(
    (output) => typeof JSON.parse(output)[0].tags[0].html === 'string',
    'doing the markdown thing'
  );

  run.timeout(500);
  run.end();
});

tape(title('Works with multiple files'), (is) => {
  const run = spawn(is, `${polydox} *.js`, {cwd});

  run.succeeds(
    'succeeds'
  );

  run.stdout.match(
    validJson,
    'outputs JSON'
  );

  run.stdout.match(
    (output) => isArray(JSON.parse(output)),
    'outputs a JSON array'
  );

  run.stdout.match(
    (output) => JSON.parse(output).length === 4,
    'with four elements (for four docblocks)'
  );

  run.timeout(500);
  run.end();
});
