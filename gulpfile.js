/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    del = require('del');


// Styles
gulp.task('styles', function() {
  return sass('src/assets/css/theme.scss', { style: 'expanded' })
    .pipe(gulp.dest('dist/styles'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts']);
});

// Connect Server Setup
gulp.task('connect', function() {
    connect.server();
});

// Default task
// gulp.task('default', ['clean', 'connect'], function() {
//   gulp.start('styles', 'scripts', 'connect');
// });

gulp.task('default', ['connect']);
 

