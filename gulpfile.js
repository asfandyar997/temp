const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const config = {
    proxy: 'http://premskins.test/',
    srcCss: [
        '!./css/src/bootstrap/bootstrap.scss',
        '!./css/src/bootstrap/bootstrap-reboot.scss',
        '!./css/src/bootstrap/bootstrap-grid.scss',
        './css/src/**/*.scss'
    ],
    destCss: './css/dist/',
    srcJs: [
        './js/src/app-ui/app.js'
    ],
    srcJsVue: [
        './js/src/app/**/*.js'
    ],
    destJs: './js/dist/',
    srcImg: './img/src',
    dstImg: './img',
    img: {
        jpg: '/**/*.jpg',
        png: '/**/*.png',
        gif: '/**/*.gif',
        jpeg: '/**/*.jpeg',
        svg: '/**/*.svg',
        ico: '/**/*.ico'
    },
    srcImgCompress: ['./img/src/**/*.jpg', './img/src/**/*.png'],
    dstImgCompress: ['./img/**/*.jpg', './img/**/*.png']
};

/**
 * Removes all files inside `tmp` directory
 */
gulp.task('clean-tmp', function () {
    console.log('Cleaning tmp...');
    return gulp.src('./tmp/*')
        .pipe(clean({force: false}));
});

/**
 * Removes all images declared in `dstImages`
 */
gulp.task('clean-images', function () {
    console.log('Cleaning images...');
    return gulp.src(config.dstImgCompress)
        .pipe(clean({force: false}));
});

/**
 * Compiles Sass files for front-end use
 */
gulp.task('build-css', function () {
    return gulp.src(config.srcCss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.destCss))
        .pipe(minCss())
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.destCss));
});

/**
 * Compiles JS files for front-end use
 */
gulp.task('build-js', function () {
    return gulp.src(config.srcJs)
        .pipe(plumber())
        .pipe(concat('app-ui.js'))
        .pipe(gulp.dest(config.destJs))
        .pipe(rename('app-ui.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.destJs));
});

gulp.task('webpack-panel', () => {
    return webpackStream(webpackConfig)
        .pipe(gulp.dest(config.destJs));
});

/**
 * Copies images from src to dst location
 */
gulp.task('images', function () {
    return gulp.src([config.srcImg + config.img.jpg, config.srcImg + config.img.jpeg, config.srcImg + config.img.png, config.srcImg + config.img.gif, config.srcImg + config.img.svg, config.srcImg + config.img.ico])
        .pipe(plumber())
        .pipe(gulp.dest(config.dstImg));
});

/**
 * Removes dst images, copresses and copies images from src to dst location
 */
gulp.task('images-compress', function () {
    gulp.series('clean-images');
    gulp.src(config.srcImgCompress)
        .pipe(plumber())
        .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
        .pipe(gulp.dest(config.dstImg));
});

/**
 * Watch images and copies images from src to dst directory
 */
gulp.task('watch-images', function () {
    return watch(config.srcImg, function () {
        gulp.series('images');
    });
});

/**
 * Browser auto refresh init
 */
gulp.task('browser-sync', function() {
    browserSync.init({
        files: [
            'cut/*.html',
            'cut/*.php',
            'css/dist/main.min.css',
            'css/src/main.scss',
            'css/src/partials/*.scss',
            'js/src/app-ui/*.js'
        ],
        proxy: config.proxy
    });
});

/**
 * Main watcher
 */
gulp.task('watcher', function () {
    gulp.watch(config.srcCss, gulp.series('build-css')).on('change', function (evt) {
        console.log('[watcher] File changed.');
    });
    gulp.watch(config.srcJs, gulp.series('build-js'));
    gulp.watch(config.srcJsVue, gulp.series('webpack-panel'));
    gulp.series('watch-images');
});

/**
 * Default task
 */
gulp.task('default', gulp.series(['build-css', 'build-js', 'webpack-panel', 'images', 'watcher']));
gulp.task('sync', gulp.series(['build-css', 'build-js', 'webpack-panel', 'images', 'watcher', 'browser-sync']));
