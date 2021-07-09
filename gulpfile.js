const gulp = require('gulp');
const less = require('gulp-less')
const path = require('path');

// gulp.task('任务名',()=>{return gulp.src('源路径').pipe('过程').pipe(gulp.dest('目标目录'))});

// gulp.task('任务名',回调函数)                         执行任务
// gulp.src('源路径')                                   源
// .pipe('')                                           管道
// gulp.dest('目标目录')                               目标    
// gulp.watch('监听目录',gulp.series('执行任务名'))     监听

// 0. gulp-rename()               $ cnpm i gulp-rename -D           改名
// 1. gulp-htmlmin()              $ cnpm i gulp-htmlmin -D          压缩html文件
// 2. gulp-cssmin()               $ cnpm i gulp-cssmin -D           压缩css文件
// 3. gulp-uglify()               $ cnpm i gulp-uglify -D           压缩js文件
// 4. gulp-imagemin()             $ cnpm i gulp-imagemin -D         压缩图片
// 5. gulp.spritesmith()          $ cnpm i gulp.spritesmith -D      制作精灵图
// 6. gulp-concat()               $ cnpm i gulp-concat -D           合并文件
// 7. gulp-less()                 $ cnpm i gulp-less -D             编译less

// 0. gulp-rename()    .pipe(rename({ suffix: '.min' }))
// gulp.task('rename',()=>{return gulp.src('dist/html/*.html')
//     .pipe(rename({ suffix: '.min' })).pipe(gulp.dest('dist/html'))});
// 
// 1. gulp-htmlmin()   .pipe(htmlmin({ collapseWhitespace: true }))
// gulp.task('htmlmin',()=>{return gulp.src('src/html/*.html')
//     .pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest('dist/html'))});

// 2. gulp-cssmin()    .pipe(cssmin())
// gulp.task('cssmin',()=>{return gulp.src('src/style/*.css')
//     .pipe(cssmin()).pipe(rename({ suffix: '.min' })).pipe(gulp.dest('dist/style'))});

// 7. gulp-less()   
gulp.task('less',()=>{return gulp.src('src/style/**/*.less')
    .pipe(less({paths:[path.join(__dirname,'less','includes')]})).pipe(gulp.dest('./src/css'))});

// 文件监听
gulp.task('watchless',()=>{
    gulp.watch('./src/style/**/*.less',gulp.series('less'))
});