import gulp from 'gulp'
import fs from 'fs'
import bookmarkletify from 'gulp-bookmarklet'
import uglify from 'gulp-uglify'
import plumber from 'gulp-plumber'
import replace from 'gulp-replace'
import { rollup } from 'rollup';
import rollBabel from 'rollup-plugin-babel'

const packageJson = require('./package.json')

gulp.task('default', ['rollup', 'bookmarkletify', 'gh-pages', 'readme', 'watch'])
gulp.task('build', ['rollup', 'bookmarkletify', 'gh-pages', 'readme'])

gulp.task('rollup', () => {
  rollup({
    entry: 'src/index.js',
    plugins: [
      rollBabel({
        babelrc: false,
        presets: ["es2015-rollup"]
      })
    ],
  }).then(function (bundle) {
    return bundle.write({
      format: 'cjs',
      dest: 'dist/index.js'
    })
  })

  gulp.src('dist/index.js')
    .pipe( plumber() )
    .pipe( replace('$version', packageJson.version) )
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

gulp.task('gh-pages', () => {
  fs.readFile('./dist/index.min.js', 'utf8', fnbookmark)
  function fnbookmark(err, data) {
    let bookmarklet = data
    fs.readFile('./src/index.html', 'utf8', (err, data) => {
      let index = data
      index = index
                    .replace('$bookmarklet', bookmarklet)
                    .replace('$version', packageJson.version)
      fs.writeFile('./index.html', index)
    })
  }
})

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', () => gulp.start('rollup') )
  gulp.watch('dist/index.js', () => {
    gulp.start('bookmarkletify')
    setTimeout( () => gulp.start('gh-pages'), 300)
  })
  gulp.watch('src/README.md', () => gulp.start('readme') )
  gulp.watch('src/index.html', () => gulp.start('gh-pages') )
})