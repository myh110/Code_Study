
const gulp = require('gulp');
const babel = require('gulp-babel');


gulp.task('default', ['praise'], function () {
    // 将你的默认的任务代码放在这

    gulp.watch(['src/**/*.es6', '!src/public/**/*.es6'], ['praise']);
});



gulp.task('praise', function () {
    // 将你的默认的任务代码放在这
    return gulp.src(['src/**/*.es6', '!src/public/**/*.es6'])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./build'))
});