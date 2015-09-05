/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
    'styles/ux/fonts.css',
    'styles/ux/bootstrap.css',
    'styles/ux/font-awesome.css',
    'styles/ux/ionicons.css',
    'styles/ux/simpletextrotator.css',
    'styles/ux/magnific-popup.css',
    'styles/ux/owl.carousel.css',
    'styles/ux/superslides.css',
    'styles/ux/vertical.css',
    'styles/ux/animate.css',
    'styles/ux/style.css',
    'styles/ux/enliten.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
    // non angular - ux js
    'js/ux/jquery-2.1.3.js',
    'js/ux/bootstrap/js/bootstrap.js',
    'js/ux/jquery.superslides.js',
    'js/ux/jquery.mb.YTPlayer.js',
    'js/ux/jquery.magnific-popup.js',
    'js/ux/owl.carousel.js',
    'js/ux/jquery.simple-text-rotator.js',
    'js/ux/imagesloaded.pkgd.js',
    'js/ux/isotope.pkgd.js',
    'js/ux/packery-mode.pkgd.js',
    'js/ux/appear.js',
    'js/ux/jquery.easing.1.3.js',
    'js/ux/wow.js',
    'js/ux/jqBootstrapValidation.js',
    'js/ux/jquery.fitvids.js',
    'js/ux/jquery.parallax-1.1.3.js',
    'js/ux/smoothscroll.js',
    'js/ux/contact.js',
    'js/ux/custom.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
    //'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
    return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
    return 'assets/' + path;
});
