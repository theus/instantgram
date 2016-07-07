import gulp from 'gulp'
import babel from 'gulp-babel'
import fs from 'fs'
import bookmarkletify from 'gulp-bookmarklet'
import uglify from 'gulp-uglify'
import plumber from 'gulp-plumber'
import replace from 'gulp-replace'
const packageJson = require('./package.json')

gulp.task('default', ['babel', 'bookmarkletify', 'watch'])

gulp.task('babel', () => {
  gulp.src('src/index.js')
    .pipe( plumber() )
    .pipe ( replace('$version', packageJson.version) )
    .pipe( babel() )
    .pipe( uglify() )
    .pipe( gulp.dest('dist/') )
})

gulp.task('bookmarkletify', () => {
  gulp.src('dist/index.js')
    .pipe( plumber() )
    .pipe( bookmarkletify() )
    .pipe( gulp.dest('dist/') )
})

gulp.task('readme', () => {
  fs.readFile('./dist/index.min.js', 'utf8', fnbookmark)
  function fnbookmark(err, data) {
    let bookmarklet = data
    fs.readFile('./src/README.md', 'utf8', (err, data) => {
      let readme = data
      readme = readme
                    .replace('$bookmarklet', bookmarklet)
                    .replace('$version', packageJson.version)
      fs.writeFile('./README.md', readme)
    })
  }
})

gulp.task('watch', () => {
  gulp.watch('src/index.js', () => gulp.start('babel') )
  gulp.watch('dist/index.js', () => gulp.start('bookmarkletify') )
  gulp.watch('src/README.md', () => gulp.start('readme') )
})