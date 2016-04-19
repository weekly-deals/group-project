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

                $scope.getProfile = function () {
                    Account.getProfile()
                        .then(function (response) {
                            $scope.user = response.data;
                        })
                        .catch(function (response) {
                            // toastr.error(response.data.message, response.status);
                        });
                };

                $scope.updateProfile = function () {
                    $scope.user.picture = Account.userPic;
                    console.log($scope.user.picture);
                    Account.updateProfile($scope.user)

                        .then(function () {
                            // toastr.success('Profile has been updated');
                            $scope.getProfile();
                        }).then(function(){
                        $scope.closeProfile()
                    })
                        .catch(function (response) {
                            // toastr.error(response.data.message, response.status);
                        });
                };

                $scope.link = function (provider) {
                    $auth.link(provider)
                        .then(function () {
                            // toastr.success('You have successfully linked a ' + provider + ' account');
                            $scope.getProfile();
                        })
                        .catch(function (response) {
                            // toastr.error(response.data.message, response.status);
                        });
                };

                $scope.unlink = function (provider) {
                    $auth.unlink(provider)
                        .then(function () {
                            // toastr.info('You have unlinked a ' + provider + ' account');
                            $scope.getProfile();
                        })
                        .catch(function (response) {
                            // toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
                        });
                };

                $scope.getProfile();
            }
        }
    });
