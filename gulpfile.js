var gulp = require('gulp');
var del = require('del');
var pl = require('gulp-load-plugins')();
var webpackConfig = require('./webpack.config.js');

// spritesmith
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/sass/sass-buttons/img/png/*.png')
  .pipe(pl.spritesmith({
    imgName: 'sprite.png', //スプライトの画像
    cssName: '_sprite.scss', //生成されるscss
    imgPath: '/img/sprite.png', //生成されるscssに記載されるパス ※webpackコンパイル時のsassから見たパスになってしまうので絶対パスにしておく
    cssFormat: 'scss', //フォーマット
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    }
  }));
  spriteData.img.pipe(gulp.dest('dist/img/')); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest('src/sass/sass-buttons/part')); //cssNameで指定したcssの保存先
});

//svgsnptore
gulp.task('svgstore', function() {
  return gulp.src('src/sass/sass-buttons/img/icon/*.svg')
    .pipe(pl.svgmin())
    .pipe(pl.svgstore({ inlineSvg: true }))
    .pipe(pl.cheerio(function ($) {
      $('svg').attr({
        style:  'position: absolute; width: 0; height: 0; visibility:hidden;',
        width: 0,
        height: 0
      });
    }))
    .pipe(gulp.dest('dist/img/'));
});

// ejs
gulp.task('ejs', function() {
    gulp.src(["src/ejs/**/*.ejs",'!' + "src/ejs/**/_*.ejs"])
    .pipe(pl.ejs())
    .pipe(gulp.dest("dist"))
});

// build
gulp.task('build', function (cb) {
  return gulp.src('')
  .pipe(pl.webpack(webpackConfig))
  .pipe(gulp.dest(''));
});

// webserver
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(pl.webserver({
      livereload: true,
      host: 'localhost',
      port: 8000,
      open: true
    }));
});


// watch
gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['build']);
  gulp.watch('src/ejs/*.*', ['ejs']);
});

// default
gulp.task('default', ['ejs','sprite','svgstore','webserver','watch']);
