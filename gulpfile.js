var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'));
});