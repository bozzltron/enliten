angular.module('enlighten.services.path', ['ngResource'])    

    // GET PATHS 
    .factory('Path', function($resource) {
        return $resource('/path');
    });
