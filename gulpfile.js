/* jshint node: true */

const
    gulp = require('gulp')
    , stylus = require('gulp-stylus')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , annotate = require('gulp-ng-annotate')
    , mainBowerFiles = require('main-bower-files')
    , cleanCSS = require('gulp-clean-css')
    , sourcemaps = require('gulp-sourcemaps')
    , postcss = require('gulp-postcss')
    , autoprefixer = require('autoprefixer')
    , mocha = require('gulp-mocha')
    , order = require('gulp-order')
    , rupture = require('rupture')
    , uncss = require('gulp-uncss')
    , browserSync = require('browser-sync').create()
    , reload = browserSync.reload
    , newer = require('gulp-newer')
    , flatten = require('gulp-flatten')
    , svgSprite = require('gulp-svg-sprite')
    , processors = [autoprefixer()];

var config = {
    shape: {
        transform: ['svgo'],
        id: {
            generator: 'icon-%s'
        },
        dimension: {
            maxWidth: 25,
            maxHeight: 25
        }
    },
    mode: {
        symbol: {
            example: true,
            inline: false,
            bust: false,
            sprite: ''
        }
    }
};

gulp.task('svg', function () {
    return gulp.src('./src/**/*.svg')
        .pipe(flatten())
        // .pipe(newer('./dist/sprite.svg'))
        .pipe(svgSprite(config))
        .pipe(flatten())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('server', function () {
    browserSync.init({
        proxy: 'http://localhost:3001',
        port: 3000
    });
});

gulp.task('bowerCss', function () {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(postcss(processors))
        .pipe(concat('lib.min.css'))
        .pipe(uncss({html: ['./src/**/*.html', 'dist/index.html']}))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./dist/css'));
});

var bowerFiles = mainBowerFiles('**/*.js').concat(['./src/scripts/satellizer.js']);

gulp.task('bowerJs', function () {
    return gulp.src(bowerFiles)
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(concat('lib.min.js'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('stylus', function () {
    return gulp.src('./src/**/*.styl')
        .pipe(flatten())
        .pipe(sourcemaps.init())
        .pipe(order([
            "first.styl",
            "**/*.styl"
        ]))
        .pipe(stylus({use: rupture()}))
        // .pipe(cleanCSS())
        .pipe(postcss(processors))
        .pipe(concat('css.min.css'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
    return gulp.src(['./src/**/*.js', '!./src/scripts/satellizer.js'])
        .pipe(flatten())
        .pipe(sourcemaps.init())
        // .pipe(annotate())
        // .pipe(uglify())
        .pipe(order([
            "app.js",
            'navbar.js',
            "**/*.js"
        ]))
        .pipe(concat('js.min.js'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(flatten())
        .pipe(gulp.dest('./dist/partials'));
});

//disabled because while developing tests it exits gulp every time a test fails
// so once your tests are all working enable this and add the tests function the default task
// gulp.task('tests', function(){
//     return gulp.src('./server/tests/*.js', {read: false})
//         .pipe(mocha());
// });

gulp.task('watch', function () {
    gulp.watch('./src/**/*.styl', ['stylus']).on("change", reload);
    gulp.watch('./src/**/*.js', ['js']).on("change", reload);
    gulp.watch('./src/**/*.html', ['html']).on("change", reload);
    gulp.watch('./dist/index.html').on("change", reload);
    gulp.watch('./src/icons/*.svg', ['svg']);
});

gulp.task('default', ['stylus', 'js', 'bowerJs', 'bowerCss', 'html', 'svg', 'server', 'watch']);
