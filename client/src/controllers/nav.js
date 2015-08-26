
var module = angular.module('enlighten.controllers.nav', ['enlighten.services.profile']);

module.controller('NavController', function ($scope, Profile,  $location) {

	var reload = false;
	$scope.location = $location;
	$scope.$watch( 'location.url()', function( url ) {

		if(reload){
			$scope.profile = Profile.get();
			reload = false;
		}
		
		if($location.url() == '/login' || $location.url() == '/logout') {
			reload = true;
		}

	 });

	$scope.go = function ( path ) {
	  $location.path( path );
	};

	$('.navbar .navbar-close').click(function() {
	    var navbar_toggle = $('.navbar-toggle');
	    if (navbar_toggle.is(':visible')) {
	        navbar_toggle.trigger('click');
	    }
	});

	$scope.profile = Profile.get();

});
