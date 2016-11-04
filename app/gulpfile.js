'use strict';
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	history = require('connect-history-api-fallback'),
	browserSync = require('browser-sync');

// define the constants
var CONSTS = {
	args: process.argv // the CLI argument vector
};

// set the output folder for the gulp tasks
function setEnv(env) {
	if (env === 'dev') {
		CONSTS.dst = '../.tmp/';
	} else if (env === 'prod'){
		CONSTS.dst = '../';
	} else {
		console.log('Invalid env option: ' + env);
		return false;
	}
	return true;
};

// if 'env' argument is defined, try to set the destination folder
if(CONSTS.args.indexOf('--env') > -1){
	// in case of a invalid environment, stops gulp execution
	if(!setEnv(CONSTS.args[CONSTS.args.indexOf('--env')+1])){
		process.exit();
	}
} else {
	setEnv('dev');
}

var assets = {
	html: [
		'assets/html/**/*'
	],
	img: [
		'assets/img/**/*'
	],
	fonts: [
		// 'bower_components/bootstrap/dist/fonts/**/*',
		// 'assets/fonts/**/*',
	],
	css: [
		// 'bower_components/bootstrap/dist/css/bootstrap.css',
		// 'bower_components/font-awesome/css/font-awesome.min.css',
		'assets/css/**/*',
	],
	js: [
		//'bower_components/bootstrap/dist/js/bootstrap.min.js',
		'bower_components/jquery/dist/jquery.min.js',
		'assets/js/**/*.js',
	]
}

/** TASK DEFINITIONS **/

gulp.task('fonts', function() {
	return gulp.src(assets.fonts)
		.pipe(gulp.dest(CONSTS.dst+'assets/fonts/'));
});

gulp.task('css', function() {
	return gulp.src(assets.css)
		.pipe(plugins.autoprefixer({browsers: ['last 1 version']}))
    	.pipe(plugins.sass.sync().on('error', plugins.sass.logError))
		.pipe(plugins.concat('dist.css'))
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest(CONSTS.dst+'assets/css/'));
});

gulp.task('js', function() {
	return gulp.src(assets.js)
		.pipe(plugins.concat('dist.js'))
		.pipe(plugins.minify())
		.pipe(gulp.dest(CONSTS.dst+'assets/js/'));
});

gulp.task('img', function() {
	return gulp.src(assets.img)
		.pipe(gulp.dest(CONSTS.dst+'assets/img/'));
});

gulp.task('html', function() {
	return gulp.src(assets.html)
		.pipe(gulp.dest(CONSTS.dst));
});

gulp.task('build', ['fonts','css','js','img','html']);

gulp.task('watch', ['build'], function () {
	gulp.watch(assets.fonts, ['fonts']);
	gulp.watch(assets.css, ['css']);
	gulp.watch(assets.js, ['js']);
	gulp.watch(assets.img, ['img']);
	gulp.watch(assets.html, ['html']);
});

gulp.task('browser-sync', ['watch'], function() {
	browserSync.init({
		server: {
			baseDir: CONSTS.dst,
			routes: {
				"/": CONSTS.dst
			},
			middleware: [ history({index: CONSTS.dst+'index.html'}) ]
		},
		startPath: "/index.html"
	});
	gulp.watch(assets.fonts).on('change', browserSync.reload);
	gulp.watch(assets.img)	.on('change', browserSync.reload);
	gulp.watch(assets.css)	.on('change', browserSync.reload);
	gulp.watch(assets.js)	.on('change', browserSync.reload);
	gulp.watch(assets.html)	.on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
