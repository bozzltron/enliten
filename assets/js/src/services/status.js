angular.module('enlighten.services.status', ['ngResource']) 

    // GET STATUS 
    .factory('Status', function($resource) {

        var status = $resource('/status/:filter/:pathId/:statusId',
        	{},
        	{
        		userStatusByPath: {
        			method: 'GET',
        			params: {
        				filter: 'path',
        				pathId: '@path'
        			}
        		},
        		update: { 
        			method:'PUT',
        			params: {
        				statusId: '@id'
        			}
        		}
        	});

        return status;
    
    });
