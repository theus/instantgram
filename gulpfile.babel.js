import gulp from 'gulp'
import fs from 'fs'
// import bookmarkletify from 'gulp-bookmarklet'
import uglify from 'gulp-uglify'
import plumber from 'gulp-plumber'
import replace from 'gulp-replace'
import { rollup } from 'rollup';
import rollBabel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import { exec } from 'child_process'
import bookmarkletify from 'bookmarkletify'

const packageJson = require('./package.json')

gulp.task('default', ['clean', 'uglify', 'bookmarkletify', 'gh-pages', 'readme', 'watch'])
gulp.task('build', ['clean', 'uglify', 'bookmarkletify', 'gh-pages', 'readme', 'test'])

gulp.task('rollup', () => {
  return rollup({
    entry: 'src/index.js',
    plugins: [
      rollBabel(babelrc())
    ],
  }).then(function (bundle) {
    return bundle.write({
      format: 'cjs',
      dest: 'dist/index.js'
    })
  })

})

gulp.task('js', ['uglify'])

gulp.task('uglify',['rollup'], () => {
   return gulp.src('dist/index.js')
    .pipe( plumber() )
    .pipe( replace(/\$version/g, packageJson.version) )
    .pipe( uglify() )
    .pipe( gulp.dest('dist/') )
})

gulp.task('clean', (done) => {
  try {
     fs.unlinkSync('dist/index.js')
     fs.unlinkSync('dist/index.min.js')
     fs.unlinkSync('./index.html')
     fs.unlinkSync('./README.md')
  }catch(e) {
    console.log(e)
  }finally{
    done()
  }
})

gulp.task('bookmarkletify', ['uglify'], (done) => {
  try {
   let js = fs.readFileSync('./dist/index.js', 'utf8')
   let bookmarklet = bookmarkletify(js);
   fs.writeFileSync('./dist/index.min.js', bookmarklet)
  } finally {
    exec('npm run metalsmith')
    done()
  }
})

gulp.task('readme', () => {
  return gulp.src('src/README.md')
    .pipe( plumber() )
    .pipe( replace(/\$version/g, packageJson.version) )
    .pipe( gulp.dest('./') )
})

gulp.task('gh-pages',['bookmarkletify'], (done) => {
  try {
    fs.readFile('./dist/index.min.js', 'utf8', cb)
    function cb(err, data){
      let bookmarklet = data
      let partial = `<a href="${bookmarklet}" class="btn" style="cursor: move;">[instantgram]</a>`
      fs.writeFile('./src/_langs/partials/button.html', partial)
    }
  } finally {
    done()
  }

})

gulp.task('test', () => exec('npm test'))

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', () => gulp.start('uglify') )
  gulp.watch('dist/index.js', () => {
    gulp.start('gh-pages')
  })
  gulp.watch('src/README.md', () => gulp.start('readme') )
  gulp.watch('src/index.html', () => gulp.start('gh-pages') )
})
