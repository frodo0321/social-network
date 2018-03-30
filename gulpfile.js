var gulp = require("gulp");
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var runSequence = require("run-sequence");
var wiredep = require("wiredep").stream;

gulp.task("default", function() {
    return gulp.task("build");
})

gulp.task("clean", function() {
    return gulp.src("dist/*", {read: false})
        .pipe(clean());
})

gulp.task("copy-index", function () {
    return gulp.src("client/index.html")
        .pipe(gulp.dest("dist"))
})

gulp.task("concat-js", function () {
    return app = gulp.src("client/**/*.js")
        .pipe(concat("app.js"))
        .pipe(gulp.dest("dist/js/"))
})

gulp.task("bower-wiredep", function() {
    gulp.src("dist/index.html")
        .pipe(wiredep({
            ignorePath:  /\.\.\//
        }))
    .pipe(gulp.dest("dist"));
})
gulp.task("bower-copy", function() {
    gulp.src("bower_components/**/*", {base: "."})
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
      templateHeader: 'angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) { \'use strict\'; '
    }))
    .pipe(gulp.dest("dist/js", {overwrite: true}));
});


gulp.task("build", function (callback) {
    runSequence(["clean", "copy-index", "bower-wiredep", "bower-copy", "concat-js"], callback);
})

