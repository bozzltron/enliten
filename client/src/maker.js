// Maker
require('./bower_components/angular/angular');
require('./bower_components/angular-cookies/angular-cookies');
require("./controllers/maker");

// Create your app
angular.module('enliten-maker', [
    'enliten-maker.controllers.maker',
]).config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
});
