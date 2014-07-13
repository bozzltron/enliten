var module = angular.module('enlighten.controllers', [
	'ngResource', 
	'ngRoute', 
	'enlighten.services.path', 
	'enlighten.services.status',
	'enlighten.services.profile'
	]);

module.controller('PathsController', function ($scope, $resource, $routeParams, Path, Status, Profile) {

	$("body").css({"background": ""});

	$scope.page2ImageApiKey = window.location.href.indexOf("localhost") != -1 ? "10a18c9aa1e1736e" : "d24fc87b01725375";

	$scope.paths = Path.query(function(paths){

		for( var i = 0; i < $scope.paths.length; i++ ) {

			$scope.thumbnail = "";
			var j = 0;
			while( $scope.paths[i].firstImage == null || j < $scope.paths[i].steps.length ) {
				if( $scope.paths[i].steps[j].type == "Photo") {
					$scope.paths[i].firstImage =  $scope.paths[i].steps[j].url;
				} else if( $scope.paths[i].steps[j].type == "Url" ) {
					$scope.paths[i].firstImage = "http://api.page2images.com/directlink?p2i_url=" + $scope.paths[i].steps[j].url + "&p2i_device=6&p2i_screen=1024x768&p2i_size=150x150&p2i_key=" + $scope.page2ImageApiKey;
				}

				j++;
			}

		}

	});

});

module.controller('PathController', function ($scope, $resource, $routeParams, Path, Status, Profile, $location, flash) {

	$("body").css({"background": ""});

	$scope.profile = Profile.get();

	var path = Path.get($routeParams, function(){

		$scope.path = path;
		$scope.status = Status.userStatusByPath({pathId:path.id});

		if($routeParams.completed == "completed") {
			flash.success = "Congratulations!  You completed " + $scope.path.name;
		}

		//$('.panel-title').click(function(){ $(".panel-body").collapse('toggle'); });

	});

});

module.controller('VertPathController', function ($scope, $resource, $routeParams, Path, Status, Profile, $location, flash) {

	$scope.profile = Profile.get();
	$scope.page2ImageApiKey = window.location.href.indexOf("localhost") != -1 ? "10a18c9aa1e1736e" : "d24fc87b01725375";
	$scope.page2ImageSize = $(window).width() <= 550 ? "300x300" : "1024x768";
	$scope.currentStep = 0;

	$scope.scroll = function(){
		
		if($scope.nextStep == null) { 
			$scope.nextStepIndex = 0;
			$scope.steps = $(".step");
			$scope.nextStep = $scope.steps[$scope.nextStepIndex];
			$scope.updating = false;
			$scope.nextTop = $($scope.nextStep).offset().top;
		}

		if($scope.nextStep){

			if($(window).scrollTop() >= $scope.nextTop) {
				
				if(!$scope.updating) {	
					$scope.updating = true;

					$scope.nextStepIndex++;
					$scope.currentStep = $scope.nextStepIndex;
					console.log("change to step" + $scope.nextStepIndex);
					$scope.nextStep = $scope.steps.length == $scope.nextStepIndex ? false : $scope.steps[$scope.nextStepIndex];
					$scope.nextTop = $scope.nextStep != false ? $($scope.nextStep).offset().top : 0;

					$scope.updating = false;
				}

			}

		} 

	};

	$scope.ready = function(){
		$(window).scroll($.proxy($scope.scroll, $scope));
	};

	this.getPath = function(){

		$scope.path = path;
	
		if($scope.profile.username) {
			$scope.status = Status.userStatusByPath({pathId:path.id});
		}

		// Smart scrolling
		//if($scope.path.steps.length > 1) {
		//	$(document).ready($.proxy($scope.ready, $scope));
		//}

	};

	var path = Path.get($routeParams, $.proxy(this.getPath, this));

});

module.controller('StepController', function ($scope, $resource, $routeParams, Path, Status, Profile) {

	var path = Path.get({id:$routeParams.id}, function(){

		$scope.page2ImageApiKey = window.location.href.indexOf("localhost") != -1 ? "10a18c9aa1e1736e" : "d24fc87b01725375";
		$scope.page2ImageSize = $(window).width() <= 550 ? "300x300" : "1024x768";
		$scope.path = path;
		$scope.index = parseInt($routeParams.step, 10);
		$scope.step = path.steps[ $scope.index - 1 ];
		console.log($scope.step);

		$(document).ready(function(){
			var p2i = new page2images();
			p2i.thumbnail('p2image');
		});

		// Set background
		$("body").css("background-image", "url('" + $scope.path.background + "')");

		// Lookup the users current status
		var status = Status.userStatusByPath({pathId:path.id}, function(){

			// Save the users current status
			$scope.status = status;

			var profile = Profile.get(function(){

				$scope.profile = profile.id;
				if(profile.id)  {

					// Deterimine where we are updating or inserting
					if (status.id) {
						status.step = parseInt($routeParams.step, 10);
						status.isCompleted = $routeParams.step == path.steps.length;
						Status.update({statusId: status.id}, status);
					} else {
						status = new Status({
							path: path.id,
							step: parseInt($routeParams.step, 10),
							isCompleted: $routeParams.step == path.steps.length,
							user: profile.id
						});
						status.$save();
					}

				}

			})

		});

	});

});

module.controller('CompleteController', function ($scope, $resource, $routeParams, Path) {

	$scope.path = Path.get($routeParams);

});
