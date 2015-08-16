module.exports = function(grunt) {

	grunt.config.set('browserify', {
		js: {
			// A single entry point for our app
			src: 'assets/js/ang-app.js',
			// Compile to a single file to add a script tag for in your HTML
			dest: 'assets/js/app-built.js',
		},

		viewer: {
			// A single entry point for our app
			src: 'assets/js/viewer.js',
			// Compile to a single file to add a script tag for in your HTML
			dest: 'assets/js/viewer-built.js',
		},

		dist: {
			options: {
				bundleOptions: {
					debug: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');

};
