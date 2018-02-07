var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var fs = require('fs');
var data = require('gulp-data');
var path = require('path');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');

/**
 * 開発用ディレクトリ
 */
var src = {
  'html': 'src/*.pug',
  'json': 'src/pug/data/',
  'sass': 'src/sass/*.scss',
  'js': 'src/js/*.js'
};
/**
 * 出力ディレクトリ
 */
var dest = {
  'html': '../dest/src',
  'sass': '../dest/src/css',
  'js': '../dest/src/js',
};

gulp.task('default', ['browser-sync', 'pug', 'sass', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.pug', ['pug']);
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.js', ['uglify']);
});

gulp.task('pug', function() {
  // JSONファイルの読み込み。
  var locals = {
    'site': JSON.parse(fs.readFileSync(src.json + 'site.json'))
  }
  gulp.src(src.html)
      .pipe(plumber({
          errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(data(function(file) {
        locals.relativePath = path.relative(file.base, file.path.replace(/.pug$/, '.html'));
        return locals;
      }))
      .pipe(pug({
        // JSONファイルとルート相対パスの情報を渡します。
        locals: locals,
        // Pugファイルのルートディレクトリを指定します。
        // `/_includes/_layout`のようにルート相対パスで指定することができます。
        basedir: 'src/pug',
        // Pugファイルの整形。
        pretty: true
      }))
      .pipe(gulp.dest(dest.html))
});

gulp.task('sass', function() {
  gulp.src(src.sass)
      .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(gulp.dest(dest.sass))
});

gulp.task('uglify',function(){
  gulp
    .src(src.js)
    .pipe(uglify())
    .pipe(gulp.dest(dest.js));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "../dest/src/"   //サーバとなるrootディレクトリ
    }
  });
  //ファイルの監視
  //以下のファイルが変わったらリロード
  gulp.watch("./*.html", ['reload']);
});
//ブラウザリロード処理
gulp.task('reload', function() {
    browserSync.reload();
});
