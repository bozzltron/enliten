angular.module('enlighten.services.profile', ['ngResource']) 

    // GET PROFILE 
    .factory('Profile', function($resource) {
        
        return $resource('/profile');

    });
