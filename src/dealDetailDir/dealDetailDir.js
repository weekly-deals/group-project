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
                    var leftArrows = document.getElementsByClassName('leftArrow');
                    var rightArrows = document.getElementsByClassName('rightArrow');
                    Array.prototype.forEach.call(leftArrows, function (e) {
                        e.style.display = 'block';
                    });
                    Array.prototype.forEach.call(rightArrows, function (e) {
                        e.style.display = 'block';
                    });
                };

            }
        }
    });
