// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.
require('../bower_components/angular/angular');

require("./controllers/viewer");

// Create your app
angular.module('enliten-viewer', [
    'enliten-viewer.controllers.viewer',
]).config(function($sceProvider) {
    // Completely disable SCE.  For demonstration purposes only!
    // Do not use in new projects.
    $sceProvider.enabled(false);
});
