// To run this code, edit file 
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myChild
// ----------------------------------- 

var myApp = angular.module('myChild', ['angle']);

myApp.run(function($log) {

  $log.log('I\'m a line from custom.js');

});

myApp.config(function(RouteHelpersProvider) {

  // Custom Route definition
  
});

myApp.controller('oneOfMyOwnController', function($scope) {
  /* controller code */
});

myApp.directive('oneOfMyOwnDirectives', function() {
  /*directive code*/
});

myApp.config(function($stateProvider /* ... */) {
  /* specific routes here (see file config.js) */
});
