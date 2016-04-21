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
                }
            },
            controller: function ($scope, $auth, Account) {

                $scope.setColor = function (color) {
                    var backgroundsToChange = document.getElementsByClassName('change-color');
                    var gradientChange = document.getElementsByClassName('gradient-change');
                    gradientChange[0].style.background = 'linear-gradient(' + color + ', transparent)';
                    var changeTextColor = document.getElementsByClassName('change-text-color');
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
                            $scope.setColor(response.data.color);
                        })
                        .catch(function (err) {
                            // console.log(err);
                        });
                };

                $scope.isAuth = function () {
                    return $auth.isAuthenticated();
                };

                if ($scope.isAuth) {
                    $scope.getProfile()
                }

                $scope.updateProfile = function () {
                    if ($scope.user.picture) {
                        $scope.user.picture = Account.userPic;
                    }
                    Account.updateProfile($scope.user);
                };

            }
        };
    });
