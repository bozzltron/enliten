var module = angular.module('enlighten.controllers.user', [
	'ngResource',
	'ngRoute',
	'enlighten.services.profile',
	'enlighten.services.path'
])

module.controller('LoginController', function($scope, $resource, $routeParams,
	flash) {

	this.submit = function(user) {


		var Login = $resource('/login');

		Login.save(user, function(res) {

			if (res.status == "failure") {
				flash.error = res.message;
			} else {
				flash.success = res.message;
				window.location.hash = "/profile";
			}

		});

	}

});


module.controller('RegisterController', function($scope, $resource,
	$routeParams, flash) {

	this.submit = function(user) {

		if (user.password == user.verifyPassword) {
			delete user.verifyPassword;
			var Register = $resource('/register');
			Register.save(user, function(res) {

				if (res.status == "failure") {
					flash.error = res.message;
				} else {
					flash.success = res.message;
					window.location.hash = "/login";
				}

			});

		} else {
			alert("Your passwords do not match");
		}
	};

});

module.controller('LogoutController', function($scope, $resource, $routeParams,
	flash) {

	var Logout = $resource('/logout');

	Logout.get(function(res) {

		if (res.status == "failure") {
			flash.error = res.message;
		} else {
			flash.success = res.message;
			window.location.hash = "/";
		}

	});

});

module.controller('ProfileController', function($scope, $resource, $routeParams,
	Profile, Path, flash) {

	$scope.profile = Profile.get();
	$scope.completed = Path.completed();
	$scope.my = Path.my();

});
