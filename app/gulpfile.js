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
		CONSTS.dst = '../game';
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
	html: {
		dst: CONSTS.dst,
		src: [
			'assets/html/**/*'
		],
	},
	img: {
		dst: CONSTS.dst+'assets/img/',
		src: [
			'assets/img/**/*'
		],
	},
	fonts: {
		dst: CONSTS.dst+'assets/fonts/',
		src: [
			// 'bower_components/bootstrap/dist/fonts/**/*',
			// 'assets/fonts/**/*',
		],
	},
	css: {
		dst: CONSTS.dst+'assets/css/',
		src: [
			// 'bower_components/bootstrap/dist/css/bootstrap.css',
			// 'bower_components/font-awesome/css/font-awesome.min.css',
			'assets/css/**/*',
		],
	},
	js: {
		dst: CONSTS.dst+'assets/js/',
		src: [
			//'bower_components/bootstrap/dist/js/bootstrap.min.js',
			'bower_components/jquery/dist/jquery.min.js',
			// 'assets/js/snake.js',
			// 'assets/js/coordinates.js',
			// 'assets/js/loop.js',
			// 'assets/js/main.js',
			'assets/js/*.js',
		],
	}
}


/** TASK DEFINITIONS **/

gulp.task('fonts', function() {
	return gulp.src(assets.fonts.src)
		.pipe(gulp.dest(assets.fonts.dst));
});

gulp.task('css', function() {
	return gulp.src(assets.css.src)
		.pipe(plugins.autoprefixer({browsers: ['last 1 version']}))
    	.pipe(plugins.sass.sync().on('error', plugins.sass.logError))
		.pipe(plugins.concat('dist.css'))
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest(assets.css.dst));
});

gulp.task('js', function() {
	return gulp.src(assets.js.src)
		.pipe(plugins.concat('dist.js'))
		.pipe(plugins.minify())
		.pipe(gulp.dest(assets.js.dst));
});

gulp.task('img', function() {
	return gulp.src(assets.img.src)
		.pipe(gulp.dest(assets.img.dst));
});

gulp.task('html', function() {
	return gulp.src(assets.html.src)
		.pipe(gulp.dest(CONSTS.dst));
});

gulp.task('build', ['fonts','css','js','img','html']);

gulp.task('watch', ['build'], function () {
	gulp.watch(assets.fonts.src, ['fonts']);
	gulp.watch(assets.css.src, ['css']);
	gulp.watch(assets.js.src, ['js']);
	gulp.watch(assets.img.src, ['img']);
	gulp.watch(assets.html.src, ['html']);
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
	gulp.watch(assets.fonts.dst+'**/*').on('change', browserSync.reload);
	gulp.watch(assets.img.dst+'**/*')	.on('change', browserSync.reload);
	gulp.watch(assets.css.dst+'**/*')	.on('change', browserSync.reload);
	gulp.watch(assets.js.dst+'**/*')	.on('change', browserSync.reload);
	gulp.watch(assets.html.dst+'**/*')	.on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
