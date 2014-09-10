// include gulp and the plugins
var gulp = require('gulp'),
 	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync');

//Task for linting
gulp.task('lint', function(){
	return gulp.src('src/js/*.js')
				.pipe(jshint())
				.pipe(jshint.reporter('default'));
});

//Task for precompiling JSX
//gulp.task('build', function() {
//  return gulp.src('./src/js/*.*')
//    .pipe(react())
//    .pipe(gulp.dest('./build/js/'));
// });	

//Add a task for minifying
gulp.task('minifyjs', function(){
	return gulp.src('src/js/*.js')
				.pipe(concat('production.js'))
				.pipe(gulp.dest('build/js'))
				.pipe(rename('production.min.js'))
				.pipe(uglify())
				.pipe(gulp.dest('build/js'));
});

// Precompile all SASS files
gulp.task('sass', function(){
	gulp.src('src/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('build/css'));
});

// Precompile all LESS files
//gulp.task('less',function(){
//	gulp.src('src/less/*.less')
//		.pipe(less())
//		.pipe(gulp.dest('build/css'))
//});

//gulp.task('imgmin', function(){
//	gulp.src('src/images/*.png')
//		.pipe(imgcompress())
//		.pipe(gulp.dest('build/images'));
//});

// Compress images, PNGs specificallyß
gulp.task('browsersync', function(){
		var modfiles = [
			'./*.html',
			'./build/css/*.css',
			'./build/js/*.js',
			'./build/images/*.png'
		];

		browserSync.init(modfiles , {
		port:9090,	
		server: {
			baseDir:"./",
			index: "rajasthan.html"
		}
	});
});

//Watching changes
gulp.task('watch', function() {
	gulp.watch('./src/js/*.js', ['lint','minifyjs']);
	gulp.watch('./src/sass/*.scss', ['sass']);
});


// Default Task
gulp.task('default', ['lint', 'sass','minifyjs','browsersync','watch']);

//Add sprite

