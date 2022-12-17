const gulp = require("gulp");
const gulpPlumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const { watch, series } = require('gulp');
const csso = require('gulp-csso');
const rename = require("gulp-rename");

//styles

const styles = (cb) => {
    return gulp.src("sourse/sass/style.scss")
    .pipe(gulpPlumber())
    .pipe(sourcemap.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]) )
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("sourse/css"))
    .pipe(gulp.dest("sourse/css"))

  }

  exports.styles = styles;

  //Server

  gulp.task("browser-sync", function() {
    sync.init({
        server: {
            baseDir: "sourse"
        },
        cors: true,
        notify: false,
        ui: false
    });
});


//Watcher



function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.default = function() {
  // You can use a single task
  watch('src/**/*.css', css);
  // Or a composed task
  watch('src/*.js', series(clean, javascript));
};
