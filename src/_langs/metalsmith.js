const Metalsmith = require('Metalsmith')
const Handlebars = require('handlebars')
const fs = require('fs')
const signale = require('signale');

// plugins
const layouts = require('metalsmith-layouts')
const permalinks = require('metalsmith-permalinks')
const define = require('metalsmith-define')

// data
const langs = require('./langs.json')
const jsonpkg = require('../../package.json')

// handlebars helpers
Handlebars.registerHelper('to_lowercase', str => str.toLowerCase())
signale.pending('Build page initiated...');

Metalsmith(__dirname)
  .use(define({
    'langs': langs,
    'version': jsonpkg.version
  }))
  .use(layouts({
    'engine': 'handlebars',
    'partials': 'partials',
    'pattern': '**/*.html',
    'default': 'default.html',
    'cache': false

  }))
  .use(permalinks(':lang/'))
  .destination('../../lang')
  .build(function (err) {
    if (err) signale.fatal(err);
    var source = fs.createReadStream('./lang/en-us/index.html')
    var dest = fs.createWriteStream('./index.html')

    source.pipe(dest)
    source.on('end', function () { signale.success('Build page complete'); })
    source.on('error', function (err) { if (err) signale.fatal(err); })
  })

