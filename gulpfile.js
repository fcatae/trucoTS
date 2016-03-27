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

watch(static_files)
    .pipe(debug('watch'))
    .pipe(gulp.dest('dist/client/'))
    
