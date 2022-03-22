/**
 * Node modules 
 */
const path = require('path')
/**
 * Gulp modules 
 */
const gulp = require('gulp')
const { src, dest, series, watch, parallel } = require('gulp')
const gulpEsbuild = require('gulp-esbuild')
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const gulpif = require('gulp-if')

const { NODE_ENV } = process.env

console.log(`NODE_ENV ${NODE_ENV}`) // !DEBUG
/**
 * Variables 
 */
const date = new Date()
const hash = date.getTime()
const year = date.getFullYear()

const ouputDir = path.join('.', 'dist')
const config = {
  html: {
    src: path.join('.', 'index.html'),
    dest: path.join('.', ouputDir,)
  },
  scss: {
    src: path.join('.', 'main.scss'),
    dest: path.join('.', 'src', 'css')
  },
  js: {
    outfile: 'app.bundle.js',
    src: path.join('.', 'app.js'),
    dest: path.join('.', 'src', 'js')
  }
}

const isProduction = NODE_ENV === "production"
const isDevelopment = NODE_ENV === "development"

/**
 * Gulp tasks 
 */
// esbuild
gulp.task('esbuild', done => {
  src(config.js.src)
    .pipe(gulpEsbuild({
      outfile: config.js.outfile,
      bundle: true,
      sourcemap: isDevelopment,
      ignoreAnnotations: true,
      legalComments: 'none',
      minify: isProduction,
      minifyIdentifiers: isProduction,
      minifyWhitespace: isProduction,
      minifySyntax: isProduction,
      format: 'cjs', // common js module
      banner: {
        js: 
`/*!
* Author: Thomas G. aka Drozerah
* https://gist.github.com/Drozerah/c21e5763d4d92bc429b995854e27f4ac
* Copyright © ${year}
*/`}}))
  .pipe(dest(config.js.dest))
  return done()
})
// Build CSS from SCSS
gulp.task('build:css', (done) => {
  src(config.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(isProduction, cleanCSS())) // minify
    .pipe(rename('style.css'))
    .pipe(dest(config.scss.dest))
  return done()
})
/**
 * GULP TASKS SERIES
 */
gulp.task('build', series('esbuild', 'build:css'))
/**
 * GULP WATCHERS 
 */
function watchJS() {
  watch(config.js.src, series('esbuild'))
}
function watchCSS() {
  watch(config.scss.src, series('build:css'))
}
gulp.task('dev', parallel(
  'esbuild',
  'build:css',
  watchJS,
  watchCSS
))