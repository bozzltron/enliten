// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.
require('./bower_components/jquery/dist/jquery');
require(
	'./bower_components/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.min');
require('./bower_components/bootstrap/dist/js/bootstrap');
require('./bower_components/angular/angular');
require('./bower_components/angular-route/angular-route');
require('./bower_components/angular-resource/angular-resource');
require('./bower_components/angular-cookies/angular-cookies');
require('./bower_components/angular-flash/dist/angular-flash');
require('./bower_components/angular-ui/build/angular-ui');

require("./services/path");
require("./services/status");
require("./services/profile");
require("./services/step");

require("./controllers/paths");
require("./controllers/user");
require("./controllers/nav");
require("./controllers/editor");

// Create your app
angular.module('enlighten', [
	'ngRoute',
	'enlighten.controllers',
	'enlighten.controllers.user',
	'enlighten.controllers.nav',
	'enlighten.controllers.editor',
	'angular-flash.service',
	'angular-flash.flash-alert-directive',
	'ui'
]).config(['$routeProvider', function($routeProvider) {

	// Specify routes to load our partials upon the given URLs
	$routeProvider.when('/', {
		templateUrl: '/views/profile.html'
	});
	$routeProvider.when('/path/:id', {
		templateUrl: '/views/path.html'
	});
	$routeProvider.when('/path/:id/vertical', {
		templateUrl: '/views/viewer/vertical.html'
	});
	$routeProvider.when('/path/:id/:completed', {
		templateUrl: '/views/path.html'
	});
	$routeProvider.when('/path/:id/step/complete', {
		templateUrl: '/views/complete.html'
	});
	$routeProvider.when('/path/:id/step/:step', {
		templateUrl: '/views/step.html'
	});
	$routeProvider.when('/login', {
		templateUrl: '/views/login.html'
	});
	$routeProvider.when('/logout', {
		templateUrl: '/views/logout.html'
	});
	$routeProvider.when('/register', {
		templateUrl: '/views/register.html'
	});
	$routeProvider.when('/profile', {
		templateUrl: '/views/profile.html'
	});
	$routeProvider.when('/editor/info/', {
		templateUrl: '/views/editor/info.html'
	});
	$routeProvider.when('/editor/info/:path', {
		templateUrl: '/views/editor/info.html'
	});
	$routeProvider.when('/editor/step/:step/:path', {
		templateUrl: '/views/editor/step.html'
	});
	$routeProvider.when('/editor/summary/:path', {
		templateUrl: '/views/editor/summary.html'
	});
	$routeProvider.otherwise({
		redirectTo: '/'
	});
	console.log("Enlighten");
}]).config(function($sceProvider) {
	// Completely disable SCE.  For demonstration purposes only!
	// Do not use in new projects.
	$sceProvider.enabled(false);
});
