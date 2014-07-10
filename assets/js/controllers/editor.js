var module = angular.module('enlighten.controllers.editor', [
	'enlighten.services.profile', 
	'enlighten.services.path', 
	'ngRoute', 
	'ui'
	]);

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
		if($scope.path.steps && $scope.path.steps[$scope.index - 1]) {
			$scope.step = $scope.path.steps[$scope.index - 1];
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

		$scope.page2ImageApiKey = window.location.href.indexOf("localhost") != -1 ? "10a18c9aa1e1736e" : "d24fc87b01725375";

		if($scope.step.type == "Photo") {
			$("#preview").html('<img src="' + $scope.step.url + '" />');
		} else if ($scope.step.type == "Url") {
			$("#preview").html('<img id="p2image" class="img-thumbnail img-responsive" src="http://api.page2images.com/directlink?p2i_url='+$scope.step.url+'&p2i_device=6&p2i_screen=1024x768&p2i_size=1024x0&p2i_fullpage=1&p2i_imageformat=png&p2i_key='+$scope.page2ImageApiKey+'" />');
			var p2i = new page2images();
			p2i.thumbnail('p2image');
		} else if ($scope.step.type == "Embed code") {
			$("#preview").html($scope.step.url);
		}

	};

	this.deleteStep = function() {

		var answer = confirm(" Are you sure you want to delete this step ?");
		if (answer){
			// Remove this step
			$scope.path.steps.splice($scope.index - 1, 1);

			// Persist to the server
			Path.update($scope.path, function(res){

				window.location.hash = '#/editor/summary/' + $scope.path.id;
				flash.success = "The step has been remove.";

			});
		}
	};

});

module.controller('EditorSummaryController', function ($scope, Profile, Path, $routeParams, flash) {

	$scope.profile = Profile.get();

	if($routeParams.path) {
		$scope.path = Path.get({id:$routeParams.path});
	}

	this.save = function(path) {

		Path.update(path, function(res){
			flash.success = "Your path has been update.";
		});

	};
	
	this.delete = function(path) {

		var answer = confirm("Are you sure you want to delete this path?");

		if(answer) {
			Path.delete(path, function(res){
				flash.success = "Your path has been deleted.";
				window.location.hash = '#/profile/';
			});
		}

	};

	// Handle the initial creation of the path
	this.submit = function(path) {

		if(!path.published) {
			path.published = true;
		} else {
			path.published = false;
		}
		
		Path.update(path, function(res){
			flash.success = "Your path has been published.";
		});

	};

});
