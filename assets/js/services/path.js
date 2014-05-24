angular.module('enlighten.services.path', ['ngResource'])       
    // GET PATHS 
    .factory('getPathService', function($resource) {
        return $resource('/path');
    });
