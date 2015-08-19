/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

	grunt.config.set('uglify', {
		options: {
			sourceMap: true
		},
		// builder: {
		// 	sourceMap: true,
		// 	src: ['.tmp/public/js/dist/builder-built.js'],
		// 	dest: '.tmp/public/js/dist/builder-built.js',
		// },
		// viewer: {
		// 	sourceMap: true,
		// 	src: ['.tmp/public/js/dist/viewer-built.js'],
		// 	dest: '.tmp/public/js/dist/viewer-built.js',
		// },
		dist: {
			sourceMap: true,
			src: ['.tmp/public/concat/production.js'],
			dest: '.tmp/public/min/production.min.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};
