var gulp = require('gulp');

gulp.task('html', function() {
   
   return gulp.src([
       'src/client/**/*.html',
       'src/client/**/*.css',
       'src/client/**/*.js',
       'src/client/**/*.png',
       'src/client/**/*.jpg'
       ])
       .pipe(gulp.dest('dist/client/'));
    
});