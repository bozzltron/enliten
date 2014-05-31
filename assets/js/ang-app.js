// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.
require('../bower_components/angular/angular');
require('../bower_components/angular-route/angular-route');
require('../bower_components/angular-resource/angular-resource');
require('../bower_components/angular-cookies/angular-cookies');
require('../bower_components/angular-flash/dist/angular-flash');

require("./services/path");
require("./services/status");
require("./services/profile");
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
  'angular-flash.flash-alert-directive'
	]).config(['$routeProvider', function($routeProvider) {

    // Specify routes to load our partials upon the given URLs
    $routeProvider.when('/', {templateUrl: 'views/home.html'});
    $routeProvider.when('/path/:id', {templateUrl: 'views/path.html'});
    $routeProvider.when('/path/:id/step/complete', {templateUrl: 'views/complete.html'});
    $routeProvider.when('/path/:id/step/:step', {templateUrl: 'views/step.html'});
    $routeProvider.when('/login', {templateUrl: 'views/login.html'});
    $routeProvider.when('/logout', {templateUrl: 'views/logout.html'});
    $routeProvider.when('/register', {templateUrl: 'views/register.html'});
    $routeProvider.when('/profile', {templateUrl: 'views/profile.html'});
    $routeProvider.when('/editor/info', {templateUrl: 'views/editor/info.html'});
    $routeProvider.when('/editor/step/:index', {templateUrl: 'views/editor/step.html'});
    $routeProvider.otherwise({redirectTo: '/'});
    console.log("Enlighten");
}]);

