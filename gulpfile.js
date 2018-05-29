const gulp      = require('gulp');
const less      = require('gulp-less');
const notify        = require("gulp-notify");  //显示报错信息
// const concat         = require("gulp-concat");  //合并css js
const browserSync = require('browser-sync').create();  //服务器
// const rev        = require("gulp-rev");         //生成版本manifest文件迭代
// const revcollector= require("gulp-rev-collector"); //根据manifest文件 增加戳
const cleancss    = require("gulp-clean-css");   //压缩css文件
// const runSequence    = require("run-sequence");   //解决异步运行
// const del          = require("del");              //删除文件
// const vinylPaths  = require('vinyl-paths');      //task任务中添加del
// const base64      = require('gulp-base64');      //图片转base64
// const fs          = require('fs');               //文件处理模块
// const imagemin    = require('gulp-imagemin');    //压缩图片文件（包括PNG、JPEG、GIF和SVG图片）
const babel       = require('gulp-babel');       //js es6转es5
const uglify      = require('gulp-uglify');      //压缩javascript文件，减小文件大小
const rename      = require('gulp-rename');      //例如将demo.css修改为demo.min.css，一般配合gulp-minify-css/gulp-uglify压缩插件一起使用
const autoprefixer = require('gulp-autoprefixer');
// const changed     = require('gulp-changed');     //监控 只重新编译更改文件
const reload      = browserSync.reload;

// gulp.task('js',function(){
//  gulp.src('./src/js/index.js')
//      .pipe(babel({
//          presets: ['es2015']
//      }))
//      .pipe(uglify())
//      .pipe(rename('./index.min.js')) //路径相对于gulp.src('./src/js/index.js')
//      .pipe(gulp.dest('./build/js'));
// });

gulp.task('less',function(){
    gulp.src('./less/main.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['> 5%','last 4 versions','ie 9-11'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(cleancss())
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream: true}));
});

gulp.task('css',function(){
    gulp.src('./css/main.css')
        .pipe(autoprefixer({
            browsers: ['> 5%','last 4 versions','ie 9-11'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(cleancss())
        .pipe(rename('./main.min.js'))
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream: true}));
});

// gulp.task('images',function(){
//  gulp.src('./src/images/*.*')
//      .pipe(imagemin())
//      .pipe(gulp.dest('./build/images'));
// });

// 静态服务器
gulp.task('default', ['css'],function() {  //没加runSequence
// gulp.task('default', function() {  //加runSequence
    // runSequence('images','css','html');
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080
    });
    //watch 路径别加./  新加的文件 监听不到
    gulp.watch("css/base.less", ['css']);  //['less']任务名称
    // gulp.watch("*.html",['html']);
    gulp.watch("*.html").on('change', reload);
    gulp.watch("js/*.js").on('change', reload);
});