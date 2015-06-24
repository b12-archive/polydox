#! /usr/bin/env node

const {stdout, exit, argv} = process;

const contains = (element, array) => array.indexOf(element) !== -1;

if (contains('-h', argv)) {
  stdout.write(require('./help/synopsis'));
  exit(0);
}

if (contains('--help', argv)) {
  stdout.write([
    require('./help/usage'),
    require('./help/options'),
    require('./help/examples'),
  ].join('\n\n'));

  exit(0);
}
