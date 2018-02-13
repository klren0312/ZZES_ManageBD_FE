var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var uglifyjs = require("uglify-js");
var minifycss = require('gulp-minify-css');

// 将task集合在一起 使用gulp命令即可运行
gulp.task('default', ['browserSync', 'watch', 'devidewatch'])

// 浏览器同步插件初始化
gulp.task('browserSync', function() {
    browserSync.init({
        // 路径
        server: {
            baseDir: './'
        },
        port: 3010
    })
})

//打包css
gulp.task('minifycss', function() {
    return gulp.src('resources/mystyle/mycss/*.css')
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('resources/mystyle/'))
})

// 打包控制器
gulp.task('controller', function() {
    gulp.src('resources/scripts/controller/*.js')
        .pipe(concat('controller.js'))
        .pipe(gulp.dest('resources/scripts/controller/indexController/'))
})

//打包过滤器
gulp.task('filter', function() {
    gulp.src('resources/scripts/filter/*.js')
        .pipe(concat('filter.js'))
        .pipe(gulp.dest('resources/scripts/controller/indexController/'))
})

// 打包echarts图表
gulp.task('echarts', function() {
    gulp.src('resources/scripts/myecharts/*.js')
        .pipe(concat('myecharts.js'))
        .pipe(gulp.dest('resources/scripts/myecharts/allmyecharts/'))
})

// 监听js,css,html的变化，而重新加载浏览器
gulp.task('watch', function() {
    gulp.watch('resources/scripts/controller/*.js', ['controller']);
    gulp.watch('resources/scripts/myecharts/*.js', ['echarts']);
    gulp.watch('resources/scripts/filter/*.js', ['filter']);
    gulp.watch(['resources/scripts/controller/*.js', 'resources/scripts/myecharts/*.js', 'resources/scripts/*.js', 'resources/scripts/filter/*.js'], browserSync.reload);
    gulp.watch(['resources/mystyle/*.css', 'resources/mystyle/othercss/*.css'], browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
})

// 监听分页面的变化
gulp.task('devidewatch', function() {
    gulp.watch('childPages/equipmentDetails/*.html', browserSync.reload);
    gulp.watch('childPages/findPwd/*.html', browserSync.reload);
    gulp.watch('childPages/userDetails/*.html', browserSync.reload);
})