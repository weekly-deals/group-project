angular.module("app").controller("mainCtrl", function($scope ) {
  $scope.deals = [1];
  
  //get data from the backend
  
//   var getDeal = function() {
//        addStuffService.retrieveDeal().then(function(data) {
         
//            $scope.deals = data.data;
//        })
//    } 
//    getDeal();
  
// var dealData = getDeal();   nat
  
  
  $scope.categories = ["food", "entertainment", "sports", "transportation"]
})


