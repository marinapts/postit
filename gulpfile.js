var gulp = require('gulp');

var watch = require('gulp-watch');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var webpack = require("webpack");
var child = require('child_process');
var fs = require('fs');


// Initialize server
gulp.task('server', function() {
  var server = child.spawn('node', ['server.js']);
  var log = fs.createWriteStream('server.log', {flags: 'a'});
  server.stdout.pipe(log);
  server.stderr.pipe(log);
});


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
var spawn = child.spawn;

gulp.task('webpack-watch', (cb) => {

    const webpack_watch = spawn('webpack', ['--watch', '--color', '--env=dev']);

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
gulp.task('default', ['server', 'minify-css', 'watch-css', 'webpack-watch']);