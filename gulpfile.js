/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del browserify vinyl-source-stream gulp-node-debug --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    minifycss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    del = require('del');
    browserify = require('browserify');
    source = require('vinyl-source-stream');

// html
gulp.task("html", function() {
    gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dist"))
});

// LINT
gulp.task('lint', function () {
  return gulp.src(['./src/*/*.js', '!./src/vendor/*'])
  .pipe(jshint())
  .pipe(jshint.reporter('default', { verbose: true }))
  .pipe(jshint.reporter('fail'));
});

// Styles
gulp.task('css', function() {
  gulp.src('./src/assets/css/edit-feature.css')
    .pipe(concatCss("edit-feature.css"))
    .pipe(gulp.dest('dist/build/css'))
    .pipe(gulp.dest('src/build/css'));
});

// Scripts
gulp.task('js', ['lint'], function() {
  browserify()
    .require("./src/assets/scripts/edit-feature.js", {entry: true})
    .bundle()
    .on("error", function(err) { console.log("Error: "+ err.message); }) 
    .pipe(source("edit-feature.js"))
    .pipe(gulp.dest('dist/build/js'))
    .pipe(gulp.dest('src/build/js'))
});

gulp.task("jsMove", function() {
    gulp.src("./src/router.js")
    .pipe(gulp.dest("./dist"))
    gulp.src("./src/vendor/*")
    .pipe(gulp.dest("./dist/vendor/"))
    gulp.src("./src/assets/json/*")
    .pipe(gulp.dest("./dist/assets/json/"))
});

// Clean
gulp.task('clean', function() {
  return del(['dist/build/*', 'src/build/']);
});

//Watch
gulp.task("watch", function(){
    gulp.watch("./src/**/*.js", ["js"]);
    // gulp.watch("./src/**/*.html", ["html"]);
    gulp.watch("./src/**/*.css", ["css"]);
});

// Connect Server Setup
gulp.task('connect', function() {
    connect.server();
});

// Default task
gulp.task('default', ['clean', 'html', 'js', 'jsMove', 'css', 'connect', 'watch'], function() {
// gulp.task('default', ['js', 'connect', 'watch'], function() {
// gulp.task('default', ['connect'], function() {
    console.log("Done");
});
 

