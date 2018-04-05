var gulp = require("gulp");
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var runSequence = require("run-sequence");
var wiredep = require("wiredep").stream;

gulp.task("default", ["build"])

gulp.task("clean", function() {
    return gulp.src("dist/*", {read: false})
        .pipe(clean());
})

gulp.task("copy-index", function () {
    return gulp.src("client/index.html")
        .pipe(gulp.dest("dist"))
})

gulp.task("concat-js", function () {
    return app = gulp.src(["client/index.js", "dist/js/app_templates.js", "client/*/**/*.js"])
        .pipe(concat("app.js"))
        .pipe(gulp.dest("dist/js/"))
})

gulp.task("bower-wiredep", function() {
    return gulp.src("dist/index.html")
        .pipe(wiredep({
            ignorePath:  /\.\.\//
        }))
    .pipe(gulp.dest("dist"));
})
gulp.task("bower-copy", function() {
    return gulp.src("bower_components/**/*", {base: "."})
        .pipe(gulp.dest("dist"))
})

gulp.task("ng-templates", function () {
  return gulp.src("client/*/**/*.html")
    .pipe(htmlmin( {
      collapseWhitespace: true,
      conservativeCollapse: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeOptionalTags: true
    }))
    .pipe(templateCache({
      filename: 'app_templates.js',
      standalone: true,
      transformUrl: function(url) {
        return url.replace('.html', '').replace(/.+\//i, '');
      },
      //templateHeader: 'angular.module("app").run(["$templateCache", function($templateCache) { \'use strict\'; '
    }))
    .pipe(gulp.dest("dist/js", {overwrite: true}));
});


gulp.task("build", function() {
    runSequence("clean", "copy-index", "bower-wiredep", "bower-copy", "ng-templates", "concat-js");
})

gulp.task("watch", ["build"], function() {
    gulp.watch("client/**/*", ["build"])
})
