const test = require('tape-catch');

test('Programmatic usage:  Fails', (is) => {
  is.throws(
    () => require('../module/index'),
    /the original `dox` is perfectly ok/i,
    'with a helpful message'
  );

  is.end();
});
