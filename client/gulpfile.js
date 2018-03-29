var gulp = require("gulp");
var clean = require("gulp-clean");
var runSequence = require("run-sequence");

gulp.task("default", function() {
    return gulp.task("build");
})


gulp.task("clean", function() {
    return gulp.src("dist/*", {read: false})
        .pipe(clean());
})

gulp.task("copy", function () {
    return gulp.src("src/*") // Get source files with gulp.src
        .pipe(gulp.dest("dist")) // Outputs the file in the destination folder
})

gulp.task("build", function (callback) {
    runSequence(["clean", "copy"], callback);
})

