const gulp = require("gulp");
const gulpPlumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const styles = (cb) => {
    return gulp.src("sourse/sass/style.scss")
    .pipe(gulpPlumber())
    .pipe(sourcemap.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]) )
    .pipe(sourcemap.write("sourse/css"))
    .pipe(gulp.dest("sourse/css"))

  }

  exports.styles = styles;
