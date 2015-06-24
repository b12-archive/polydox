#! /usr/bin/env node

const {stdout, stderr, exit, argv} = process;

const forEach = require('1-liners/forEach');

const args = argv.slice(2);
const flags = {};
const files = [];
forEach((arg) => {
  if (arg.charAt(0) === '-') flags[arg] = true;
  else files.push(arg);
}, args);

if (flags['-h']) stdout.write(require('./help/usage'));

if (flags['--help']) stdout.write([
  require('./help/synopsis'),
  require('./help/options'),
  require('./help/examples'),
].join('\n\n'));

if (flags['-h'] || flags['--help']) exit(0);

if (!files.length) {
  stderr.write(require('./help/usage'));
  exit(1);
}

const {readFileSync} = require('fs');
const {resolve} = require('path');

const curry = require('1-liners/curry');
const replace = require('1-liners/replace');
const extend = require('1-liners/extend');
const {parseComments} = require('dox');

const indent = curry(replace)(/^(?!$)/mg, '  ');
const toJson = (object) => JSON.stringify(object, null, 2);

stdout.write('[');

forEach((sourceFile, fileId) => {
  const decorate = curry(extend)({sourceFile});

  const source =
    readFileSync(resolve(process.cwd(), sourceFile), {encoding: 'utf8'})
  ;

  forEach(
    (comment, commentId) => stdout.write(
      ((fileId === 0 && commentId === 0) ? '\n' : ',\n') +
      indent(toJson(decorate(comment)))
    ),
    parseComments(source)
  );
}, files);

stdout.write('\n]\n');

exit(0);
