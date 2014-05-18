angular.module('enlighten.services', ['ngResource'])       
    // GET PATHS 
    .factory('getPathService', function($resource) {
    	console.log("returning resource");
        return $resource('/path', {}, {query: {method:"GET", isArray:true}});
    });
