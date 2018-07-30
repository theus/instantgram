const signale = require('signale');
var bookmarkletify = require('bookmarkletify');
var fs = require('fs');
const process = require('process');
const pkg = require('../package.json')

signale.pending('Bookmarklet generating...');

var instantgram = fs.readFileSync('./dist/main.js', 'utf8');
var bookmarkletString = bookmarkletify(instantgram);

function hash () {
  if (process.argv[2] && process.argv[2] === '--dev') {
    return ' ' + Math.random().toString(36).substring(5, 15);
  }

  return ' ' + pkg.version;

}

function button (bookmarklet) {
  return '<a href="' + bookmarklet + '" class="btn" style="cursor: move;">[instantgram'+ hash() +']</a>';
}

fs.writeFileSync('./src/_langs/partials/button.html', button(bookmarkletString));

signale.success('Bookmarklet generated');




