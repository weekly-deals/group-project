angular.module('app')
.directive('catDirective', function(){

 return {
   templateUrl: '/catTemplate.html',
   restrict: 'E',
   scope: {
     group:'=',
     data: '='
   },
   controller: 'ModalCtrl as vm',
   link: function(scope, element, attributes) {
     scope.toggle = function() {
       scope.show = !scope.show;
     };

   },
   controllerAs: 'vm'
 };


});
