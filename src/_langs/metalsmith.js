const Metalsmith = require('Metalsmith')
const Handlebars = require('handlebars')
const fs = require('fs')

// plugins
const layouts = require('metalsmith-layouts')
const permalinks = require('metalsmith-permalinks')
const define = require('metalsmith-define')

// data
const langs = require('./langs.json')
const package = require('../../package.json')

// handlebars helpers
Handlebars.registerHelper('to_lowercase', str => str.toLowerCase())

Metalsmith(__dirname)
  .use(define({
    'langs': langs,
    'version': package.version
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
  .build(function(err) {
    if (err) throw err
  })

var source = fs.createReadStream('./lang/en-us/index.html')
var dest = fs.createWriteStream('./index.html')

source.pipe(dest)
source.on('end', function() { console.log('build complete') })
source.on('error', function(err) { if (err) throw err })