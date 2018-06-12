const gulp = require('gulp');
const babel = require("gulp-babel");
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const gulpSequence = require('gulp-sequence');
//生产环境
gulp.task("builddev", () => {
    return watch('./src/nodeuii/**/*.js', { ignoreInitial: false }, () => {
        gulp.src('./src/nodeuii/**/*.js').pipe(babel({
            //禁用.babelrc 文件 留给webpack用
            babelrc: false,
            "plugins": [
                "transform-es2015-modules-commonjs"
            ]
        }))
            .pipe(gulp.dest('dist'));
    })
});

//上线环境
gulp.task("buildprod", () => {
    gulp.src('./src/nodeuii/**/*.js').pipe(babel({
        babelrc: false,
        ignore:["./src/nodeuii/config/*.js"],
        "plugins": [
            "transform-es2015-modules-commonjs"
        ]
    }))
    .pipe(gulp.dest('dist'));
});
//开启清洗流
gulp.task("buildconfig",()=>{
    gulp.src('./src/nodeuii/**/*.js')
      .pipe(rollup({
        // output:{
        //     format:"cjs",
        // },
        input: "./src/nodeuii/config/index.js",
        plugins: [
            replace({
              "process.env.NODE_ENV": JSON.stringify('production')
            })
          ]
      }))
    .pipe(gulp.dest('./dist'));
});

let _task = ['builddev'];

if(process.env.NODE_ENV == "production"){
    _task = gulpSequence(["buildprod","buildconfig"])
}
gulp.task('default',_task )