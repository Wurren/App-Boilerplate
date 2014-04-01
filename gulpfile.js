var gulp       = require('gulp'),
     less      = require('gulp-less'),
     cssmin    = require('gulp-minify-css'),
     notify    = require('gulp-notify'),
     path      = require('path'),
     uglify    = require('gulp-uglify'),
     concat    = require('gulp-concat'),
     rename    = require('gulp-rename'),
     livereload = require('gulp-livereload');

gulp.task('less', function() {
     return gulp.src('app/public/less/style.less')
          .pipe(less())
          .pipe(cssmin())
          .pipe(gulp.dest('app/public/css'))
          .pipe(notify({ message: 'Less - Done!'}));
});

gulp.task('uglify', function() {
     return gulp.src('app/public/js/src/*.js')
          .pipe(concat('main.js'))
          .pipe(rename('main.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('app/public/js'))
          .pipe(notify({ message: 'JS - Done!' }))
});

gulp.task('watch', function() {
     gulp.watch('app/public/less/*.less', ['less']);
     gulp.watch('app/public/js/src/*.js', ['uglify']);
     var server = livereload();
     gulp.watch(['app/public/less/*.less', 'app/public/js/src/*', 'app/views/**/*.html']).on('change', function(file) {
          server.changed(file.path);
     });
});

