import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('css',
    () => gulp.src('./styles/*.scss')
              .pipe(sourcemaps.init())
              .pipe(sass().on(error, sass.logError))
              .pipe(postcss())
              .pipe(sourcemaps.write('.'))
              .pipe(gulp.dest('./styles')));

gulp.task('watch', () => {
    gulp.watch('./styles/**/*.scss', ['css']);
});

gulp.task('default', ['css']);
