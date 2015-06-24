const {resolve} = require('path');
const {execFile} = require('child_process');

const tape = require('tape-catch');
const {test, plus, curry} = require('1-liners');

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
