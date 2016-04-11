angular.module('app')
.directive('catDirective', function(){

 return {
   templateUrl: '../partials/catTemplate.html',
   restrict: 'E',
   scope: {
     group:'=',
   },
   controller: 'mainCtrl',
   link: function(scope, element, attributes) {
     scope.toggle = function() {
       scope.show = !scope.show;
     };

   }
 };


});