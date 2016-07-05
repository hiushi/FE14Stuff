var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
	return gulp.src(['src/lib/angular.js', 'src/lib/**/*.js', 'src/js/main.js', 'src/js/**/*.js'])
		.pipe(concat('app.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});