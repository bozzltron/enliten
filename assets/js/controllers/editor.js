var module = angular.module('enlighten.controllers.editor', ['enlighten.services.profile', 'enlighten.services.path']);

module.controller('EditorController', function ($scope, Profile, Path) {

	$scope.profile = Profile.get();
	
	this.submit = function(path) {

		Path.save(path, function(res){

			console.log(arguments);

		});

	};

});
