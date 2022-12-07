const sass = require('gulp-sass')(require('sass'));

const styles = (cb) => {
    return gulp.src('sourse/sass/style.scss')
    .pipe(gulp.dest('sourse/css'))
    .pipe(sass().on('error', sass.logError))
  }

  exports.styles = styles;
