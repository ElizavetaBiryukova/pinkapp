const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
}

exports.html = html;

//Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename("menu.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Images

const images = () => {
  return gulp.src("source/img/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({
        quality: 90,
        progressive: true
        }),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

exports.images = images;

// WebP

const createWebp = () => {
  return gulp.src("source/img/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/img/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

//Copy

const copy = () => {
  return gulp.src([
      "source/fonts/*.{woff2,woff}",
      "source/*.ico"
    ],
    {
      base: "source"
    })
    .pipe(gulp.dest("build"));
}

exports.copy = copy;

//Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

//Reload

const reload = done => {
  sync.reload();
  done();
}


// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/menu.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

//Build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    copy,
    scripts,
    sprite,
    images,
    createWebp
  )
);

exports.build = build;

exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    copy,
    scripts,
    sprite,
    images,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
