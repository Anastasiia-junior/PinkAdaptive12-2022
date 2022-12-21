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
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
  }

  exports.styles = styles;

  //Server

  const server = (done) => {
    sync.init({
        server: {
            baseDir: "build"
        },
        cors: true,
        notify: false,
        ui: false
    });
    done();
};

exports.server = server;


//Watcher

function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

function scss(cb) {
  // body omitted
  cb();
}

const watcher = () => {
  // You can use a single task
  watch('sourse/scss/*.scss', scss);
  // Or a composed task
  watch('sourse/*.js', javascript);
};

exports.watcher = watcher;


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
    .pipe(gulp.dest('build/img'))
}

exports.imagemin = imagemin;


//WebP

const webp = () => {
  return gulp.src("sourse/img/**/*.{png,jpg")
  .pipe(webp())
  .pipe(gulp.dest("build/img"))
};

exports.webp = webp;


//Sprites

const svgstore = () => {
    return gulp
        .src("sourse/img/**/icon-*.svg")
        .pipe(svgstore())
        .pipe(rename("icon-sprite.svg"))
        .pipe(gulp.dest("build/img"));
};

exports.svgstore = svgstore;


const copy = () => {
  return gulp.src([
    "sourse/fonts/**/*.{woff,woff2}",
    "sourse/img/**",
    "sourse/js/**",
    "sourse/*.ico"
  ], {
    base: "sourse"
  })
  .pipe(gulp.dest("build"));
};

exports.copy = copy;
