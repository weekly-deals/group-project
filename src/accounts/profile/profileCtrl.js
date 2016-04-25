angular.module('app')
    .directive('profileDir', function () {
        return {
            restrict: 'E',
            templateUrl: '/profile.html',
            scope: {
                show: '='
            },
            link: function (scope) {
                scope.closeProfile = function () {
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
                }
            },
            controller: function ($scope, $auth, Account, $timeout) {

                $scope.setColor = function () {
                  var color;
                  if(arguments[0]) {
                    color = arguments[0];
                  } else {
                    color = $scope.user.color;
                  }
                    var backgroundsToChange = document.getElementsByClassName('change-color');
                    var gradientChange = document.getElementsByClassName('gradient-change');
                    gradientChange[0].style.background = 'linear-gradient(' + color + ', transparent)';
                    var changeTextColor = document.getElementsByClassName('change-text-color');
                    var borderChange = document.getElementsByClassName('change-border');
                    Array.prototype.forEach.call(borderChange, function(elem) {
                      elem.style.boxShadow = '-10px 0 30px -2px ' + color;
                    });
                    Array.prototype.forEach.call(changeTextColor, function (elemText) {
                        elemText.style.color = color;
                    });
                    Array.prototype.forEach.call(backgroundsToChange, function (elemBg) {
                        elemBg.style.background = color;
                    });
                    $scope.user.color = color;
                    Account.updateProfile($scope.user);
                };

                $scope.getProfile = function () {
                    Account.getProfile()
                        .then(function (response) {
                            $scope.user = response.data;
                            $timeout($scope.setColor, 200);
                        })
                        .catch(function (err) {
                            // console.log(err);
                        });
                };

                $scope.getProfile();

                $scope.updateProfile = function () {
                    if (Account.userPic) {
                        $scope.user.picture = Account.userPic;
                    }
                    Account.updateProfile($scope.user);
                };

            }
        };
    });
