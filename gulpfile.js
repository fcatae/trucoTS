var gulp = require('gulp');
var watch = require('gulp-watch');
var debug = require('gulp-debug');

var static_files = [
       'src/client/**/*.html',
       'src/client/**/*.css',
       'src/client/**/*.js',
       'src/client/**/*.png',
       'src/client/**/*.jpg'
       ];
        
gulp.task('html', function() {   
   return gulp.src(static_files)
       .pipe(gulp.dest('dist/client/'));    
});

gulp.task('client-dep', function() {
    return gulp.src([
        'bower_components/eventemitter/build/eventemitter.js',
        'bower_components/jquery/dist/jquery.min.js'
    ])
        .pipe(gulp.dest('dist/client/js'));
});

gulp.task('html-watch', function() {

    return watch(static_files)
        .pipe(gulp.dest('dist/client/'))
        .pipe(debug('watch'));
    
})
    
gulp.task('default', ['client-dep', 'html']);