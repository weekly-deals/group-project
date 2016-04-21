angular.module('app')
    .directive('dealDetailDir', function(){
        return {
            restrict: 'E',
            templateUrl: '/dealDetail.html',
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

            }
        }
    });
