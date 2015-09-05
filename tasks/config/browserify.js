module.exports = function(grunt) {

	grunt.config.set('browserify', {

		builder: {
			options: {
				browserifyOptions: {
					debug: true
				}
			},
			// A single entry point for our app
			src: 'client/src/builder.js',
			// Compile to a single file to add a script tag for in your HTML
			dest: 'assets/js/dist/builder-built.js',
		},

		viewer: {
			options: {
				browserifyOptions: {
					debug: true
				}
			},
			// A single entry point for our app
			src: 'client/src/viewer.js',
			// Compile to a single file to add a script tag for in your HTML
			dest: 'assets/js/dist/viewer-built.js',
		},


		maker: {
			options: {
				browserifyOptions: {
					debug: true
				}
			},
			// A single entry point for our app
			src: 'client/src/maker.js',
			// Compile to a single file to add a script tag for in your HTML
			dest: 'assets/js/dist/maker-built.js',
		}

	});

	grunt.loadNpmTasks('grunt-browserify');

};
