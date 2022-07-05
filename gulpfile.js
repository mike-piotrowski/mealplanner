const entryPath = '.';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function compileSass(done) {
  gulp
    .src(entryPath + '/development/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(entryPath + '/development/css'));

  done();
}

function reloadBrowser(done) {
  browserSync.reload();
  done();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: entryPath + '/development/',
            index: 'index.html'
        },
        open: true,
    });
    gulp.watch(entryPath + '/development/scss/**/*.scss', gulp.series(compileSass));
    gulp.watch(
        [
            entryPath + '/development/index.html',
            entryPath + '/development/css/css',
            entryPath + '/development/js/js',
        ],
        gulp.series(reloadBrowser)
    );
}

exports.watch = gulp.parallel(compileSass, watch);
exports.default = gulp.parallel(compileSass);
