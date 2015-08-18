module.exports = function(grunt) {

	grunt.config.set('browserify', {

		builder: {
			options: {
				browserifyOptions: {
					debug: true,
					command: 'uglifyjs'
				}
			},
			// A single entry point for our app
			src: 'assets/js/src/builder.js',
			// Compile to a single file to add a script tag for in your HTML
			dest: 'assets/js/dist/builder-built.js',
		},

		viewer: {
			options: {
				browserifyOptions: {
					debug: true,
					command: 'uglifyjs'
				}
			},
			// A single entry point for our app
			src: 'assets/js/src/viewer.js',
			// Compile to a single file to add a script tag for in your HTML
			dest: 'assets/js/dist/viewer-built.js',
		}

	});

	grunt.loadNpmTasks('grunt-browserify');

};
