"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

var del = require("del");

var production = process.env.NODE_ENV === "production";

gulp.task("sass", function() {
  return gulp.src("./app/css/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(sass(production ? { outputStyle: "compressed" } : {})
        .on("error", sass.logError))
    // create sourcemap file
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./public/"));
});

if (!production) {
  // copy mock API json data to public folder to avoid real API requests
  // outside production
  gulp.task("mock-data", function() {
    return gulp.src("./app/common/mock-data/**/*")
      .pipe(gulp.dest("./public"));
  });
  gulp.task("default", ["sass", "mock-data"]);

} else {
  // delete mock API data files if production
  gulp.task("clean:mock-data", function() {
    return del([
      "./public/*.json"
    ]);
  });
  gulp.task("default", ["sass", "clean:mock-data"]);
}

// complete default task before watching
gulp.task("watch", ["default"], function() {
  gulp.watch("./app/css/*.scss", ["sass"]);
});
