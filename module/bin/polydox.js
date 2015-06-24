#! /usr/bin/env node

const {stdout, stderr, exit, argv} = process;

const args = argv.slice(2);
const flags = {};
args.forEach((argument) => {
  if (argument.charAt(0) === '-') flags[argument] = true;
});

if (!args.length) {
  stderr.write(require('./help/synopsis'));
  exit(1);
}

if (flags['-h']) stdout.write(require('./help/synopsis'));

if (flags['--help']) stdout.write([
  require('./help/usage'),
  require('./help/options'),
  require('./help/examples'),
].join('\n\n'));

if (flags['-h'] || flags['--help']) exit(0);
