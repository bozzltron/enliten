// Viewer
require('./bower_components/angular/angular');
require('./bower_components/angular-cookies/angular-cookies');
require("./controllers/viewer");

// Create your app
angular.module('enliten-viewer', [
    'enliten-viewer.controllers.viewer',
]).config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
});
