// Maker
require('./bower_components/angular/angular');
require('./bower_components/angular-cookies/angular-cookies');
require('./bower_components/angular-resource/angular-resource');

require("./controllers/maker");
require("./services/profile");

// Create your app
angular.module('enliten-maker', [
    'enliten-maker.controllers.maker',
]).config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
});
