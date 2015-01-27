var gulp = require('gulp'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    data = require('gulp-data'),
    fs = require('fs'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps');
    spritesmith = require('gulp.spritesmith');

gulp.task('less', function(){
    gulp.src('./less/style.less')
        //.pipe(sourcemaps.init())
        .pipe(less())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./code/css'))
        .pipe(gulp.dest('./code/css/'))
        .pipe(connect.reload());
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('forsprites/**/*.png').pipe(spritesmith({
        imgName: '../img/sprite.png',
        cssName: 'sprite.css',
        padding: 10,
        'cssOpts': {
            // Some templates allow for skipping of function declarations
            'functions': false,
            // CSS template allows for overriding of CSS selectors
            'cssClass': function(item) {
                return '.' + item.name;
            }
        }
    }));
    var spriteDataLess = gulp.src('forsprites/**/*.png').pipe(spritesmith({
        imgName: '../img/sprite.png',
        cssName: 'sprite-variables.less',
        cssFormat: 'less',
        padding: 10
    }));
    spriteData.pipe(gulp.dest('./code/css'));
    spriteDataLess.pipe(gulp.dest('less/general'));
});



gulp.task('autoprefixer', function(){
    gulp.src('./code/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./code/css/autoprefixer'));
});


gulp.task('jade', function() {

    gulp.src('./jade/*.jade')
        .pipe(jade({
            pretty: true,
            data: JSON.parse ( fs.readFileSync('code/home.json', { encoding: 'utf8' } ))
        }) )
        .pipe(gulp.dest('./code/'))
        .pipe(connect.reload());

});



gulp.task('connect', function() {
    connect.server({
        root: 'code',
        livereload: true
    });
});

gulp.task('watch', function(){
    gulp.watch(['less/*.less', 'less/**/*.less'], ['less']),
    gulp.watch(['jade/*.jade', 'jade/**/*.jade'], ['jade']),
    gulp.watch(['forsprites/*.**', 'forsprites/**/*.**'], ['sprite'])
});

gulp.task('default', ['connect', 'sprite', 'watch']);