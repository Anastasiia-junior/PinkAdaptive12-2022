const gulp = require("gulp");
const gulpPlumber = require("gulp-plumber");
const sass = require('gulp-sass')(require('sass'));

const styles = (cb) => {
    return gulp.src('sourse/sass/style.scss')
    .pipe(gulpPlumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('sourse/css'))

  }

  exports.styles = styles;
