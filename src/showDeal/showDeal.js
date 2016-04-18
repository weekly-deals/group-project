angular.module('app')
    .directive('showDeal', function(){
        return {
            templateUrl: '/showDeal.html',
            restrict: 'E',
            deal: '=',
            close: '&',
            controller: function($scope) {

                $scope.showDeal = function(){
                    var body = document.getElementById('body');
                    var curtain = document.getElementById('modal-curtain');
                    curtain.style.display = 'block';
                    body.style.overflow = 'auto';
                };

            }
        }
    });