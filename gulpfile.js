/**
 * Node modules 
 */
const path = require('path')
/**
 * Gulp modules 
 */
const gulp = require('gulp')
const { src, dest, series, watch } = require('gulp')
const gulpEsbuild = require('gulp-esbuild')
/**
 * Variables 
 */
const date = new Date()
const hash = date.getTime()
const year = date.getFullYear()
const _path = {
  output_dir: path.join('.', 'dist'),
  js: {
    outfile: 'app.bundle.js',
    src: path.join('.', 'app.js'),
    dest: path.join('.', 'src', 'js')
  }
}
/**
 * Gulp tasks 
 */
// esbuild
gulp.task('esbuild', done => {
  src(_path.js.src)
    .pipe(gulpEsbuild({
      outfile: _path.js.outfile,
      bundle: true,
      sourcemap: true,
      ignoreAnnotations: true,
      legalComments: 'none',
      minify: true,
      minifyIdentifiers: true,
      minifyWhitespace: true,
      minifySyntax: true,
      format: 'cjs', // common js module
      banner: {
        js: 
`/*!
* Author: Thomas G. aka Drozerah
* https://gist.github.com/Drozerah/c21e5763d4d92bc429b995854e27f4ac
* Copyright © ${year}
*/`}}))
  .pipe(dest(_path.js.dest))
  return done()
})
/**
 * GULP TASKS SERIES
 */
gulp.task('build', series('esbuild'))
/**
 * GULP WATCHERS 
 */
gulp.task('dev', () => {
  watch(_path.js.src, series('esbuild'))
})