/*Tip: Working with Node v13.12.0*/
const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const fileinclude = require("gulp-file-include");
const clean = require("gulp-clean");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");

gulp.task("clean", function () {
  return gulp.src("assets/build/").pipe(clean());
});


gulp.task("styles", function () {
  console.log("styles files changed. Reloading...");
  return gulp
    .src("assets/scss/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
        prefix: "",
      })
    )
    .pipe(autoprefixer(["last 10 versions"]))
    .pipe(
      cleancss({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(gulp.dest("assets/build/css"))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function () {
  return gulp
    .src(["assets/js/**/*"])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("assets/build/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "api.html"
        },
        port: 9000,
        browser: "google chrome",
    });
});

gulp.task("watch", function () {
  gulp.watch("assets/scss/**/*.scss", gulp.parallel("styles"));
  gulp.watch(
    ["assets/js/*.js"],
    gulp.parallel("scripts")
  );
});

gulp.task(
  "default",
  gulp.parallel(
    "styles",
    "scripts",
    "browser-sync",
    "watch"
  )
);
