angular.module('app')
    .directive('editDealDir', function(){
        return {
            restrict: 'E',
            templateUrl: '/editDeal.html',
             scope: {
                 show: '=',
                 deal: '='
             },
            link: function (scope) {

                scope.closeDetails = function(){
                    scope.show = false;
                    var body = document.getElementById('body');
                    body.style.overflow = 'auto';
                };

            },
            controller: function ($scope, adminService) {
                $scope.updatedDeal = {};
                $scope.updateDeal
             = function(dealId, updatedData) {
                    console.log(updatedData);
                    adminService.updateDeal(dealId, updatedData);
                }
            }
        }
    });
