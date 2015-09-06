var module = angular.module('enliten-maker.controllers.maker', [
    'enlighten.services.profile',
    'ngCookies'
]);

module.controller('MakerController', function($scope, $http, $cookies, Profile) {

    $scope.path = {
        steps: []
    };

    $scope.profile = Profile.get();

    var controller = this;
    $('#enliten-maker').swipe({
        allowPageScroll: "vertical",
        //Generic swipe handler for all directions
        swipe: function(event, direction, distance,
            duration,
            fingerCount, fingerData) {

            if (direction == 'left') {
                controller.closeDrawer();
            } else if (direction == 'right') {
                controller.openDrawer();
            }
        }
    });

    var drawer = $(".drawer:first");
    drawer.css({left:-1 * drawer.width()});

    this.openDrawer = function(){
        console.log("open");
        drawer.css({left:0});
    };

    this.closeDrawer = function(){
        console.log("close");
        $(".drawer").css({left:-1 * drawer.width()});
    };

    this.search = function() {
        console.log("search",  $('.search:first').val());
        // Simple GET request example :
        var params = {
            q: $('.search:first').val(),
            f: 'json',
            start: 1,
            length: 10,
            l: 'en',
            src: 'web',
            i: false,
            key: 'Dt610xc7abKOq36BZXHDgJGNZ3E_'
        };

        $http.get('http://www.faroo.com/api?' + $.param(
            params)).
        then(function(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('faroo', response);
            if (response.data.results.length > 0) {
                $scope.results = response.data.results;
            } else {
                $scope.results = [{
                    title: 'Nothing found.  Keep looking.'
                }];
            }
        }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            flash.error = "Your step has been saved.";
        });


    };

    this.add = function(result) {
        console.log("result", result);
        var step = {};
        step.name = result.title;
        console.log("path", $scope.path);
        step.user = $scope.profile.id;
        step.order = $scope.index;
        step.description = result.kwic;
        step.iurl = result.iurl;
        step.url = result.url;
        step.type = 'Url';

        $scope.path.steps.push(step);
        console.log("added", $scope.path);
    };

    // Handle step create/edit
    this.save = function() {

        $scope.step.path = $scope.path.id;
        $scope.step.user = $scope.profile.id;
        $scope.step.order = $scope.index;
        console.log("save", $scope.step);

        if ($scope.step.id) {

            Step.update($scope.step, function(res) {

                var step = parseInt($scope.index, 10) + 1;
                window.location.hash = '#/editor/step/' + step + '/' + $scope.path
                    .id;
                flash.success = "Your step has been updated.";

            });

        } else {

            Step.save($scope.step, function(res) {

                var step = parseInt($scope.index, 10) + 1;
                window.location.hash = '#/editor/step/' + step + '/' + $scope.path
                    .id;
                flash.success = "Your step has been saved.";

            });

        }

    };

});
