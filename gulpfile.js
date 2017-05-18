var gulp = require('gulp');

var watch = require('gulp-watch');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var webpack = require("webpack");


// Concatenate & Minify CSS
gulp.task('minify-css', function () {
    return gulp.src([
        './app/css/materialize.css',
        './app/css/base.css',
        './app/css/colors.css',
        './app/css/spaces.css',
        './app/css/components.css',
    ])
    .pipe(changed('public/css/'))
    .pipe(cleanCSS({debug: true}, function(details) {
        // console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('public/css/'))
});

// Run webpack
var spawn = require('child_process').spawn;

gulp.task('webpack-watch', (cb) => {

    const webpack_watch = spawn('webpack', ['--watch', '--color']);

    webpack_watch.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    webpack_watch.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    webpack_watch.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

// Watch css files for changes and run minify-css again
gulp.task('watch-css', function() { 
    gulp.watch('./app/css/*.css', ['minify-css']); 
 }); 

// Default Task
gulp.task('default', ['minify-css', 'watch-css', 'webpack-watch']);