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
                    var backgroundsToChange = Array.from(document.getElementsByClassName('change-color'));
                    var gradientChange = Array.from(document.getElementsByClassName('gradient-change'));
                    gradientChange[0].style.background = 'linear-gradient(' + color + ', transparent)';
                    var changeTextColor = Array.from(document.getElementsByClassName('change-text-color'));
                    changeTextColor.forEach(function (elemText) {
                        elemText.style.color = color;
                    });
                    backgroundsToChange.forEach(function (elemBg) {
                        elemBg.style.background = color;
                    });
                    $scope.user.color = color;
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

                $scope.getProfile();

                $scope.updateProfile = function () {
                    if ($scope.user.picture) {
                        $scope.user.picture = Account.userPic;
                    }

                    Account.updateProfile($scope.user);

                };
            }
        };
    });
