const {bold} = require('chalk');

module.exports =
`  ${bold('EXAMPLES')}

    $ polydox a.js

    $ polydox a.js b.js c.js > dox-output.json

    $ polydox source/*.js | doxie --render --inject into Readme.md
`;
