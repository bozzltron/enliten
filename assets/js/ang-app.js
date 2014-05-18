// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.
require('../bower_components/angular/angular');
require('../bower_components/angular-route/angular-route');
require('../bower_components/angular-resource/angular-resource');

require("./services/path");
require("./controllers/paths");

// Create your app
angular.module('enlighten', [
	'ngRoute', 
	'enlighten.controllers'
	]).config(['$routeProvider', function($routeProvider) {
  
  // Specify routes to load our partials upon the given URLs
  $routeProvider.when('/', {templateUrl: 'views/home.html'});
  $routeProvider.when('/path', {templateUrl: 'views/path.html'});
  $routeProvider.otherwise({redirectTo: '/'});
  console.log("Enlighten");
}]);

