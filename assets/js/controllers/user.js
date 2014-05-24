var module = angular.module('enlighten.controllers.user', ['ngResource', 'ngRoute'])

module.controller('LoginController', function ($scope, $resource, $routeParams) {

	this.submit = function(user) {
		

		var Login = $resource('/login');
	     Login.save(user, function(res){
	       	console.log(arguments);
	       	
	     });

	}
	
});


module.controller('RegisterController', function ($scope, $resource, $routeParams) {

	this.submit = function(user) {
		
		if(user.password == user.verifyPassword) {
			delete user.verifyPassword;
			var Register = $resource('/register');
		     Register.save(user, function(res){
		       	console.log(arguments);

		     });
	
		} else {
			alert("Your passwords do not match");
		}
	}
	
});