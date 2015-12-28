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
    del = require('del'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    glob = require('glob'),
    path = require('path'),
    es = require('event-stream'),
    nodemon = require('gulp-nodemon');

// html
gulp.task("html", function () {
    gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist"))
});

// LINT
gulp.task('lint', function () {
    return gulp.src(['./src/*/*.js', '!./src/vendor/*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default', {verbose: true}))
        .pipe(jshint.reporter('fail'));
});

// Styles
gulp.task('css', function () {
    gulp.src('./src/assets/css/edit-feature.css')
        .pipe(concatCss("edit-feature.css"))
        .pipe(gulp.dest('dist/build/css'))
        .pipe(gulp.dest('src/build/css'));
});

// Scripts
gulp.task('js', ['lint'], function (done) {

    glob("./src/assets/scripts/feature/**/*.js", function (err, files) {
        if (err) {
            done(err);
        }

        var tasks = files.map(function (entry) {
            return browserify({entries: [entry]})
                .bundle()
                .pipe(source(path.basename(entry)))
                .pipe(gulp.dest('./dist/build/js'));
        });

        es.merge(tasks).on('end', done);
    });

});

gulp.task("jsMove", function () {
    gulp.src("./src/router.js")
        .pipe(gulp.dest("./dist"))
    gulp.src("./src/vendor/*")
        .pipe(gulp.dest("./dist/vendor/"))
    gulp.src("./src/assets/json/*")
        .pipe(gulp.dest("./dist/assets/json/"))
});

// Clean build folders
gulp.task('clean', function () {
    return del(['dist/build/*', 'src/build/']);
});

//Watch
gulp.task("watch", function () {
    gulp.watch("./src/**/*.js", ["js"]);
    gulp.watch("./src/**/*.js", ["jsMove"]);
    // gulp.watch("./src/**/*.html", ["html"]);
    gulp.watch("./src/**/*.css", ["css"]);
});

// Connect Server Setup
gulp.task('connect', function () {
    connect.server();
});

gulp.task('start', function () {
    // server runs on port: 3000 by default port can re-configured in
    // server/config.js file
    nodemon({
        script: 'server/server.js',
        ext: 'js html jade',
        evn: {'NODE_ENV': 'development'}
    });
});

gulp.task('default', ['start'], function () {
});

// Default task
//gulp.task('default', ['clean', /* 'html',*/ 'js', 'jsMove', 'css', 'connect', 'watch'], function() {
//// gulp.task('default', ['js', 'connect', 'watch'], function() {
//// gulp.task('default', ['connect'], function() {
//    console.log("Done");
//});
 

