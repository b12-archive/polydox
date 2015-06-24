[![Coveralls – test coverage
](https://img.shields.io/coveralls/studio-b12/polydox.svg?style=flat-square)
](https://coveralls.io/r/studio-b12/polydox)
 [![Travis – build status
](https://img.shields.io/travis/studio-b12/polydox/master.svg?style=flat-square)
](https://travis-ci.org/studio-b12/polydox)
 [![David – status of dependencies
](https://img.shields.io/david/studio-b12/polydox.svg?style=flat-square)
](https://david-dm.org/studio-b12/polydox)
 [![Stability: unstable
](https://img.shields.io/badge/stability-unstable-yellowgreen.svg?style=flat-square)
](https://github.com/studio-b12/polydox/milestones/1.0)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)




polydox
===

**Pipe multiple files into *[dox][]* at once.**

[dox]:  http://npm.im/dox




<p align="center"><a
  title="Graphic by the great Justin Mezzell"
  href="http://justinmezzell.tumblr.com/post/64773265522"
  >
  <br/>
  <br/>
  <img
    src="Readme/Soundboard.gif"
    width="400"
    height="300"
  />
  <br/>
  <br/>
</a></p>




Why
---

The original `dox` CLI tool [reads a single source from stdin][]:

```sh
$ dox < utils.js
...JSON...
```

This simple idea gets complicated in a multi-file project. Here are your options:

* Concat files before piping them to `dox`:

```sh
$ cat source/*.js | dox
...LINE NUMBERS LOST...
```

* Concat `dox` output:

```sh
$ for file in source/*.js; do dox $file; done
...NOT VALID JSON...
```

* Wild hacks.

**But worry no more!** Now you have `polydox`:

```sh
$ polydox source/*.js
[
  {
    // …usual dox output PLUS:
    "sourceFile": "source/a.js"
  },
  {
    // …usual dox output PLUS:
    "sourceFile": "source/b.js"
  },
]
```

[reads a single source from stdin]:  https://github.com/tj/dox/tree/934b22c#usage-examples




Installation
------------

```sh
$ npm install --global polydox
```




Usage
-----

  SYNOPSIS

    Usage: polydox [options] <file>...


  OPTIONS

    -h  --help   Print a short synopsis (-h) or this usage info (--help)
    -r  --raw    Don’t preprocess stuff with markdown


  EXAMPLES

    $ polydox a.js

    $ polydox a.js b.js c.js > dox-output.json

    $ polydox source/*.js | doxie --render --inject into Readme.md





License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]:              ./License.md
[Studio B12 GmbH]:  http://studio-b12.de
