angular.module('app')
.directive('catDirective', function(){

 return {
   templateUrl: '/catTemplate.html',
   restrict: 'E',
   scope: {
     group:'=',
     data: '='
   },
   link: function(scope, element, attributes) {
     scope.toggle = function() {
       scope.show = !scope.show;
     };
   },
   controller: function($scope){
     $scope.showDesc = function (deal) {
       var desc = document.getElementById('deal-desc');
       desc.style.opacity = '1 !important';
       deal.hideDesc = true;
     };

     $scope.hideDesc = function (deal) {
       deal.hideDesc = false;
     };
   }
 };


});
