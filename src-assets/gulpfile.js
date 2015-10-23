var gulp 		= require('gulp');
var uglify 		= require('gulp-uglify');
var concat 		= require('gulp-concat');
var striplog 	= require('gulp-strip-debug');
var minifycss 	= require('gulp-minify-css');
var gutil 		= require('gulp-util');
var sass 		= require('gulp-sass');
var notify 		= require("gulp-notify");

//js files
gulp.task('scripts', function() {
  var js_src = 'js/*.js';
  var js_dest = '../assets/';
  // pipe the js through concat, console log stripping, uglification and then store
  return gulp.src(js_src)
      .pipe(concat('scripts.min.js')) // concat all files in the src
      .pipe(striplog())
      .pipe(uglify())   // uglify them all
      .pipe(gulp.dest(js_dest)) // save the file
      .on('error', gutil.log); 
});

gulp.task('css', function() {  
  return gulp.src(['scss/*.scss']) 
      .pipe(sass({style: 'compressed', errLogToConsole: true}))  // Compile sass
      .pipe(concat('styles.min.css'))                               // Concat all css
      .pipe(minifycss())                                         // Minify the CSS
      .pipe(gulp.dest('../assets/'))                      // Set the destination to assets/css
});

gulp.task('watch', function(){
  gulp.watch(['scss/*.scss'], ['css']); // Watch and run sass on changes
  gulp.watch('js/*.js', ['scripts']); // Watch and run javascripts on changes
  gulp.src('../assets/')
    .pipe(notify('An asset has changed'));
});

gulp.task('default', ['css', 'scripts', 'watch']);
