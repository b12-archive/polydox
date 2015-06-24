#! /usr/bin/env node

const {argv} = require('yargs');
const {stdout, exit} = process;

if (argv.h) stdout.write(require('./help/synopsis'));

if (argv.help) stdout.write([
  require('./help/usage'),
  require('./help/options'),
  require('./help/examples'),
].join('\n\n'));

if (argv.h || argv.help) exit(0);
