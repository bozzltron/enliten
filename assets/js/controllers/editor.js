var module = angular.module('enlighten.controllers.editor', ['enlighten.services.profile', 'enlighten.services.path', 'ngRoute']);

module.controller('EditorController', function ($scope, Profile, Path, $routeParams, flash) {

	$scope.profile = Profile.get();
	
	if($routeParams.path) {
		$scope.path = Path.get({id:$routeParams.path});
	}

	// Handle the initial creation of the path
	this.submit = function(path) {

		if($routeParams.path) {

			path.user = $scope.profile.id;
			Path.update(path, function(res){
				window.location.hash = '#/editor/summary/' + res.id;
				flash.success = "Your path has been saved.";
			});

		} else {

			path.user = $scope.profile.id;
			Path.save(path, function(res){
				window.location.hash = '#/editor/step/1/' + res.id;
				flash.success = "Your path has been saved.";
			});

		}

	};

});

module.controller('EditorStepController', function ($scope, Profile, Path, $routeParams, flash) {

	$scope.profile = Profile.get();
	$scope.index = parseInt($routeParams.step,10);
	$scope.path = Path.get({id:$routeParams.path}, function(){

		// Load existing path
		if($scope.path.steps[$scope.index - 1]) {
			$scope.step = $scope.path[$scope.index - 1];
		}
	});


	// Handle step create/edit
	this.submit = function(step) {

		if(!$scope.path.steps){
			$scope.path.steps = [];
		}

		$scope.path.steps[$scope.index - 1] = step;

		Path.update($scope.path, function(res){

			var step = parseInt($scope.index, 10) + 1;
			window.location.hash = '#/editor/step/' + step +  '/' + $scope.path.id;
			flash.success = "Your step has been saved.";

		});

	};

	this.preview = function(url){
		document.getElementById("iframe").src = url;
	};

});

module.controller('EditorSummaryController', function ($scope, Profile, Path, $routeParams, flash) {

	$scope.profile = Profile.get();

	if($routeParams.path) {
		$scope.path = Path.get({id:$routeParams.path});
	}
	
	// Handle the initial creation of the path
	this.submit = function(path) {

		path.published = true;
		Path.update(path, function(res){
			flash.success = "Your path has been published.";
		});

	};

});