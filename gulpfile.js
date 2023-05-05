const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const pug = require('gulp-pug');

// PROCESS HTML
gulp.task('taskHTML', async function() {
  return gulp.src("./src/pug/*.pug")
    .pipe(pug({pretty: true,}))
    .pipe(gulp.dest("./dist"));
})

// PROCESS CSS
gulp.task('taskCSS', async function() {
  return gulp.src('./src/sass/main.scss') // SOURCE FILE WE NEED TO DO TASK ON IT
  .pipe(sass({outputStyled: 'compressed'})) // RETURN AN CSS CODE compressed (WE CAN MAKE IT NESTED) 
  .pipe(autoprefixer('last 2 version')) // ADD CSS AUTOPREFIXER FOR THE LAST 2 VERSION OF BROWSER
  .pipe(rename('dist.main.css')) // RENAME THE FILE
  .pipe(gulp.dest('./dist/css/')) // CREATE THE NEW CSS FILE INSIDE dist/css => dist/css/dist.main.css
})

// PROCESS JS
gulp.task('taskJS', async function() {
  return gulp.src('./src/js/*.js')
  .pipe(concat('script.js')) // concatenate all js files inside one file 'script.js'
  .pipe(uglify()) // will minify the script.js file make it compressed
  .pipe(gulp.dest('./dist/js/')) // CREATE THE NEW CSS FILE INSIDE dist/css => dist/css/dist.main.css
})

// WATCH
gulp.task('watch', async function() {
  gulp.watch('./src/pug/**/*.pug', gulp.series('taskHTML'))
  gulp.watch('./src/sass/**/*.scss', gulp.series('taskCSS'))
  gulp.watch('./src/js/*.js', gulp.series('taskJS'))
})