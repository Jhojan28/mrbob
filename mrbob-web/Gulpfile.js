var gulp = require('gulp')
var rename = require('gulp-rename')
var babel = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var preset =  require('babel-preset-es2015')
var watchify = require('watchify')
var vueify = require('vueify')

function compile (watch, dest) {
	let bundle = browserify({
			"entries": './client/main.js',
			"noParse": ["vue.js"],
			"read": false,
			"plugin": watch ? [watchify] : [],
		})
		.transform(babel, { presets: ["es2015"], plugins: ['syntax-async-functions', 'transform-regenerator'] })
		.transform(vueify)
		.on('update',function () {
			rebundle()
		})
		
	function rebundle() {
		console.log("---> building...")
		bundle.bundle()
			.on("error", function (err) {
				console.log("error--->", err)
			})
			.pipe(source('main.js'))
			.pipe(rename("bundle.js"))
			.pipe(gulp.dest('public'))
		console.log("---> finished build")
	}
	rebundle()		
}

gulp.task('build', () => compile(true))
gulp.task('default', [ 'build'])