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
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require('gulp-svgstore');

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


//imagemin

const imagemin = () => {
  return gulp.src("sourse/img/**/*.{jpg, png, svg}")
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('sourse/img'))
}

exports.imagemin = imagemin;


//WebP

gulp.task("default", () => {
  return gulp.src("sourse/img/**/*.{png,jpg")
  .pipe(webp())
  .pipe(gulp.dest("sourse/img"))
});

//Sprites

gulp.task('svgstore', () => {
    return gulp
        .src("sourse/img/**/icon-*.svg")
        .pipe(svgstore())
        .pipe(rename("icon-sprite.svg"))
        .pipe(gulp.dest("sourse/img"));
});
